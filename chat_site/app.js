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
// app.use(express.session({ secret: 'your secret here' }));

app.use(app.router);
app.get('/', (req, res) => {
    res.render('index.ejs', {
        title: 'Express app',
        user: {
            name: 'Boris',
        },
    });
});

app.use(express.static(path.join(__dirname, 'public')));

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);

