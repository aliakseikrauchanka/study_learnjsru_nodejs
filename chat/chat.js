var clients = [];

exports.subscribe = function (req, res) {
    clients.push(res);
    console.log('subscribed');

    res.on('close', () => {
        clients.splice(clients.indexOf(res));
    });
};

exports.publish = function (message) {
    console.log('publish');
    clients.forEach(listener => {
        listener.end(message);
    });

    clients = [];
};

setInterval(() => {
    console.log('client length ', clients.length);
}, 2000);
