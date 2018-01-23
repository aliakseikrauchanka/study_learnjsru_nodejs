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
        console.log('Hello from user.all middleware');
        next();
    });

router.use((req, res, next) => {
    console.log('Hello from router.use middleware');
    res.json({
        id: req.user,
    });
});

app.use('/', router);


