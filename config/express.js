var express = require('express');
//var home = require('../app/routes/home');
var load = require('express-load');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function() {
	var app = express();
	app.set('port', 3000);
	
	app.use(express.static('./public'));

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	app.use(cookieParser());

	app.use(session(
		{
			secret: 'Batatinha quando nasce',
			resave: true,
			saveUninitialized: true
		}
	));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(helmet());

	//app.disable('x-powered-by');
	app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'}));

	// Evitando o "encaixotamento" do site dentro de um iframe
	app.use(helmet.frameguard());

	// Evita a injeção de scripts maliciosos apontando para
	// sites de terceiros
	app.use(helmet.xssFilter());

	// Evita que o navegador tente adivinhar por conta própria
	// o tipo de arquivo que está sendo enviado a ele. Por exemplo,
	// um arquivo .txt que contém um código.js, o navegador não
	// irá tentar executá-lo
	app.use(helmet.noSniff());

	//home(app);
	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
};