const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(express);

module.exports = new MongoStore({
    mongooseConnection: mongoose.connection,
});
