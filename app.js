var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
var server = require('http').createServer(app);

app.set('port', process.env.PORT || 5700);
app.set('views', __dirname + 'app/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html'); //替换文件扩展名ejs为html

app.use(express.static(path.join(__dirname, 'app')));

app.get('/*', function(req, res) {
	res.sendfile('app/index.html');
});

server.listen(app.get('port'), function() {
	console.log('desktop is listening port ' + app.get('port'));
});