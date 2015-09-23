var express = require('express');
var path = require('path');
var ejs = require('ejs');

// var session = require('express-session');
var mongoose = require('mongoose');
// var mongoStore = require('connect-mongo')(session);
var app = express();
var server = require('http').createServer(app);

/*var dbUrl = 'mongodb://localhost/desktop';
mongoose.connect(dbUrl);*/

var User = require('./server/models/user');

app.set('port', process.env.PORT || 5700);
app.set('views', __dirname + '/app');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'app')));

app.get('/siebre/*', function(req, res) {
	res.render('index.html');
});

server.listen(app.get('port'), function() {
	console.log('desktop is listening port ' + app.get('port'));
});