var _ = require('underscore');
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

var deleteTable = function(beneficiarytableObj, callback) {
	var groups = beneficiarytableObj.groups;
	for (var i = 0; i < groups.length; i++) {
		var rows = groups[i].rows;
		for(var j = 0; j < rows.length; j++) {
			// 删除beneficiary
			var id = rows[j].beneficiary._id;
			Beneficiary.remove({_id: id},function(err, beneficiary) {
				if (err) {
					console.log(err);
				}

				// 所有beneficiary都删除后，再删除beneficiarytable
				// if (i === groups.length - 1 && j === rows.length - 1) {	
					Beneficiarytable.remove({_id: beneficiarytableObj._id}, function(err, beneficiarytable) {
						if (err) {
							console.log(err);
						}
						callback();
					});
				// }
			});
		}
	}
};

var saveTable= function(beneficiarytableObj, callback) {
	var groups = beneficiarytableObj.groups;
	for (var i = 0; i < groups.length; i++) {
		var rows = groups[i].rows;
		for(var j = 0; j < rows.length; j++) {
			rows[j].beneficiary.groupIndex = i;
			rows[j].beneficiary.rowIndex = j;
			// 新建beneficiary
			var beneficiary = new Beneficiary(rows[j].beneficiary);
			beneficiary.save(function(err, beneficiary) {
				if (err) {
					console.log(err);
				}

				// 将beneficiarytable里每个beneficiary对象修改为ObjectId
				beneficiarytableObj.groups[beneficiary.groupIndex]
					.rows[beneficiary.rowIndex].beneficiary = beneficiary;

				// 所有beneficiary都保存到数据库后，再保存beneficiarytable
				if (beneficiary.groupIndex === groups.length - 1 && beneficiary.rowIndex === rows.length - 1) {	
					var beneficiarytable = new Beneficiarytable(beneficiarytableObj);
					beneficiarytable.save(function(err, beneficiarytable) {
						if (err) {
							console.log(err);
						}
						callback();
					});
				}
			});
		}
	}
};

app.delete('/api/beneficiarytable/:id', function(req, res) {
	var id = req.params.id;
	Beneficiarytable.findById(id, function(err, beneficiarytable) {
		deleteTable(beneficiarytable, function(result) {
			res.json({success: result});
		});
	});
});

app.post('/api/beneficiarytable', function(req, res) {
	var beneficiarytableObj = req.body.beneficiarytable;
	saveTable(beneficiarytableObj, function(table) {
		res.send({beneficiarytable: table});
	});
});

app.patch('/api/beneficiarytable/:id', function(req, res) {
	var id = req.params.id;
	var newTable = req.body.beneficiarytable;
	// console.log(newTable.groups[0].rows[0]);
	Beneficiarytable.findById(id, function(err, beneficiarytable) {
		deleteTable(beneficiarytable, saveTable(newTable, function(table) {
			res.send({beneficiarytable: table});
		}));
	});
});

app.get('/api/beneficiarytable/:id', function(req, res) {
	var id = req.params.id;
	Beneficiarytable.findById(id, function(err, beneficiarytable) {
		if (err) {
			console.log(err);
		}
		res.send({ table: beneficiarytable });
	});
});

app.get('/api/beneficiarytables', function(req, res) {
	Beneficiarytable.fetch(function(err, beneficiarytables) {
		if (err) {
			console.log(err);
		}
		res.send({ beneficiarytables: beneficiarytables });
	});
});

app.post('/api/beneficiary', function(req, res) {
	
});

app.get('/api/beneficiary/:id', function(req, res) {
	var id = req.params.id;
	Beneficiary.findById(id, function(err, beneficiary) {
		res.send({ beneficiary: beneficiary });
	});
});

app.get('/api/beneficiaries', function(req, res) {
	Beneficiary.fetch(function(err, beneficiaries) {
		if (err) {
			console.log(err);
		}
		res.send({ beneficiaries: beneficiaries });
	});
});

server.listen(app.get('port'), function() {
	console.log('desktop is listening port ' + app.get('port'));
});