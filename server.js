var http = require('http');
var app = require('./config/express')(); // Cuidado: há dois parênteses vazios aqui

var dbConn = require('./config/database');
dbConn('mongodb://localhost/contatooh');

http
	.createServer(app)
	.listen(app.get('port'), function() {
		console.log('Express escutando na porta ' + app.get('port'))
	});