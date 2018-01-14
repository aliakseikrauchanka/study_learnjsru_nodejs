// log(db.getPhrase('Run successfully'));

module.exports = function (module) {
    return function () {
        var args = [].slice.call(arguments);
        args = [module.filename].concat(args);
        console.log.apply(console, args);
    }
};