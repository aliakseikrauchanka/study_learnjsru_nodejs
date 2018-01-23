var express = require('express');
var app = express();
/* let options */
var router = express.Router(/*options*/);

app.listen(777);

router.param('id', (req, res, next, id) => {
    console.log(`Matched id = ${id}`);
    next();
});

// router.param('id', (req, res, next, id) => {
//     console.log(`Matched(2nd handler) id = ${id}`);
// });

router.get('/user/:id', (req, res) => {
    res.json({
        id: req.params.id,
    });
});

app.use('/', router);
