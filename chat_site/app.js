
/**
 * Module dependencies.
 */

var domain = require('domain');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var config = require('./config');
var log = require('./libs/log')(module);

var app = express();
app.set('port', config.get('port'));

http.createServer(app).listen(config.get('port'), function () {
    log.info('Express server listening on port ' + config.get('port'));
});

app.use((req, res, next) => {
    if (req.url === '/') {
        res.end('Hello from first middleware');
    } else {
        next();
    }
});

app.use((req, res, next) => {
    if (req.url === '/forbidden') {
        next(new Error('Woops, denied'));
    } else {
        next();
    }
});

app.use((error, req, res, next) => {
    var errorHandler;
    if (app.get('env') === 'development') {
        var errorHandler = express.errorHandler();
        errorHandler(error, req, res, next);
    } else {
        res.send(500, 'Keep calm, everything is fine');
    }
});

app.use((req, res, next) => {
    if (app.get('env') === 'development') {
        res.end('Hello from second middleware');
    } else {
        next();
    }
});

app.use((req, res) => {
    res.send(404, 'Express Not found page');
});

// all environments
// app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(express.session({ secret: 'your secret here' }));
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));
//
// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }
//
// app.get('/', routes.index);
// app.get('/users', user.list);

