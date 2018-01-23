var express = require('express');
var app = express();
/* let options */
var router = express.Router(/*options*/);

app.listen(777);

router.param('id', (req, res, next, id) => {
    req.user = {
        id: id,
        name: 'name',
    };
    next();
});

router.route('/user/:id')
    .all((req, res, next) => {
        console.log('user.all middleware');
        next();
    })
    .get((req, res) => {
        res.json(req.user);
    });

app.use('/', router);
