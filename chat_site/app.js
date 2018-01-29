/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var HttpError = require('error').HttpError;
var config = require('./config');
var log = require('./libs/log')(module);

var app = express();
app.set('port', config.get('port'));

var http = require('http').createServer(app);
http.listen(config.get('port'), function () {
    console.log(`Listening on port ${config.get('port')}`);
    log.info('Express server listening on port ' + config.get('port'));
});

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());

// if (app.get('env') === 'development') {
//     app.use(express.logger('dev'));
// } else {
//     app.use(express.logger('default'));
// }

app.use(express.json());
app.use(express.urlencoded());

app.use(express.cookieParser());
app.use(express.session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: require('libs/sessionStore'),
}));

app.use(require('middleware/loadUser')); // must be after session is initialized but before router
app.use(require('middleware/sendHttpError'));

app.use(app.router);

require('routes')(app);
app.use(function (err, req, res, next) {
    if (typeof err === 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') === 'development') {
            var errorHandler = express.errorHandler();
            errorHandler(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

app.use(express.static(path.join(__dirname, 'public')));

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

app.set('ee', new (require('events').EventEmitter)());
require('socket')(http, app);

