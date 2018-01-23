const express = require('express');
const http = require('http');

var app = express();

// // Alternative
//
// http.createServer(app).listen(3001, () => {
//     console.log('Started listening');
// });

app.listen(3000, () => {
    console.log('Started listening');
});

app.param('param', (req, res, next, param) => {
    console.log(`CALLED ONLY ONCE! Matched ${param}`);
    next();
});
app.get('/:param', (req, res, next) => {
    res.send('Hello');
    next();
});

app.use(express.json());
