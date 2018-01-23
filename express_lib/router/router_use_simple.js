var express = require('express');
var app = express();
/* let options */
var router = express.Router(/*options*/);

app.listen(777);

app.param('id', (req, res, next, id) => {
    req.user = {
        id: id,
        name: 'name',
    };
    console.log(`Param ${id}`);
    next();
});

router.use((req, res) => {
    console.log('Hello from router.use middleware');
    res.json(req.user);
});

app.use('/user/:id', router);

