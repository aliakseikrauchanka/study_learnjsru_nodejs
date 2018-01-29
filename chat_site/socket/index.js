const sessionStore = require('libs/sessionStore');
const cookieParser = require('express').cookieParser();
const HttpError = require('error').HttpError;
const cookie = require('cookie');
const config = require('config');
const connect = require('connect');
const { promisify, format } = require('util');
const User = require('models/user').User;

module.exports = function (http, app) {
    var io = require('socket.io')(http);

    var loadSession = (sid) => {
        return new Promise((res, rej) => {
            sessionStore.load(sid, (err, session) => {
                if (err) {
                    rej(err);
                }

                res(session);
            });
        });
    };

    io.use(async function (socket, next) {
        console.log('Authorization');
        var handshakeData = socket.request;
        handshakeData.cookies = cookie.parse(handshakeData.headers.cookie || '');
        var sidCookie = handshakeData.cookies[config.get('session:key')];
        var sid = connect.utils.parseSignedCookie(sidCookie, config.get('session:secret'));

        try {
            handshakeData.session = await loadSession(sid);
            handshakeData.user = await User.findById(handshakeData.session.user);
        } catch (e) {
            console.log('ERrorrrrr', e);
            next(new HttpError(500, 'Issue while initializing session in handshake'));
        }

        next();
    });

    app.get('ee').on('session:reload', sid => {
        Object.keys(io.sockets.sockets).forEach(async function (socketSid) {
            socket = io.sockets.sockets[socketSid];
            if (socket.request.session.id !== sid) {
                return;
            }

            try {
                const session = await loadSession(sid);
                if (!session) {
                    socket.emit('merror', 'no session');
                    socket.disconnect();
                    return;
                }
            } catch (e) {
                socket.emit('error', e);
                socket.disconnect();
                return;
            }

            client.request.session = session;
        });

        console.log(`Session with id: ${sid} was reload`);
    });

    io.origins(['localhost:*']);
    io.on('connection', function (socket) {
        if (!socket.request.user) {
            return;
        }

        var username = socket.request.user.get('username');
        socket.on('message', function (text, cb) {
            var str = format('%s: %s', username, text);
            socket.broadcast.emit('server:message', str);
            cb(str);
        });
    });

    return io;
};

