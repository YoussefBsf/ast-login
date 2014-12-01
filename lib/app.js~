
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    express = require('express'),
    validator = require('express-validator'),
    favicon = require('serve-favicon'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    session = require('express-session');
var app = express();

env = process.env.NODE_ENV || 'development';   
app.config = require(__dirname + '/config/globals');

app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');

if (env === 'development') {
    app.use(errorHandler())
}

app.use(methodOverride()); 					            
app.use(bodyParser.urlencoded({ extended: false }));    
app.use(bodyParser.json());                             
app.use(validator([]));
app.use(favicon(__dirname + '/../public/favicon.ico')); 
app.use(express.static(__dirname + '/../public'));      
require(__dirname + '/config/db')(app.config);

app.use(cookieParser('VHZd553sJumsi7ahX2S9Bz5G2776XsAm'));
app.use(session({
    cookie:            {
        maxAge: 2628000000
    },
    resave:            true,
    saveUninitialized: true,
    secret:            '6dxQ47H66W8aKhS7gtHP8AmnytiR39F5'
}));

require(__dirname + '/config/routes')(app, express);

module.exports = app;
