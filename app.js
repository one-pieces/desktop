var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var app = express();
var server = require('http').createServer(app);

var dbUrl = 'mongodb://localhost/desktop';
mongoose.connect(dbUrl);

var User = require('./server/models/user');
var Beneficiary = require('./server/models/beneficiary');
var Beneficiarytable = require('./server/models/beneficiarytable');

app.set('port', process.env.PORT || 5700);
app.set('views', __dirname + '/app');
app.engine('.html', ejs.__express);
app.set('view engine', 'html'); //替换文件扩展名ejs为html

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'app')));
app.use(cookieParser());
app.use(session({
	secret: 'desktop',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	}),
	resave: false,
	saveUninitialized: true
}));

app.get('/desktop/*', function(req, res) {
	res.render('index.html');
});

app.get('/api/users', function(req, res) {
	User.fetch(function(err, users) {
		if (err) {
			console.log(err);
		}
		res.send(users);
	});
});

app.post('/api/beneficiarytable', function(req, res) {
	var _beneficiarytable = req.body.beneficiarytable;
	var groups = _beneficiarytable.groups;
	for (var i = 0; i < groups.length; i++) {
		var rows = groups[i].rows;
		for(var j = 0; j < rows.length; j++) {
			rows[j].beneficiary.groupIndex = i;
			rows[j].beneficiary.rowIndex = j;
			var beneficiary = new Beneficiary(rows[j].beneficiary);
			beneficiary.save(function(err, beneficiary) {
				if (err) {
					console.log(err);
				}

				// 将beneficiarytable里每个beneficiary对象修改为ObjectId
				_beneficiarytable.groups[beneficiary.groupIndex]
					.rows[beneficiary.rowIndex].beneficiary = beneficiary;

				// 所有beneficiary都保存到数据库后，再保存beneficiarytable
				if (beneficiary.groupIndex === groups.length - 1 && beneficiary.rowIndex === rows.length - 1) {	
					var beneficiarytable = new Beneficiarytable(_beneficiarytable);
					beneficiarytable.save(function(err, table) {
						if (err) {
							console.log(err);
						}
						res.send(table);
					});
				}
			});
		}
	}
});

app.get('/api/beneficiarytable/:id', function(req, res) {
	var id = req.params.id;
});

app.post('/api/beneficiary', function(req, res) {
	
});

app.get('/api/beneficiaries', function(req, res) {
	Beneficiary.fetch(function(err, beneficiaries) {
		if (err) {
			console.log(err);
		}
		res.send(beneficiaries);
	});
});

server.listen(app.get('port'), function() {
	console.log('desktop is listening port ' + app.get('port'));
});