//DECLARATION
var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var app = express();
var login = require('./controllers/login');
var home = require('./controllers/home');
var ticket = require('./controllers/ticket');
var port = 1234;

//CONFIGURATION
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({secret: 'my top secret password', saveUninitialized: true, resave: false}));
//ROUTES
app.use('/login', login);
app.use('/home', home);
app.use('/tickets', ticket);

app.get('/', function(req, res){
	res.redirect('/login');
});
//SERVER
app.listen(port, function () {
  console.log('Server Started.....');
})
