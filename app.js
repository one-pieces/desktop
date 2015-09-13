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