var crypto = require('crypto');

var mongoose = require('libs/mongoose');

var schema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },

    hashedPassword: {
        type: String,
        required: true,
    },

    salt: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = async function (username, password) {
    let user = await this.findOne({ username: username });

    if (!user) {
        user = new User({
            username: username,
            password: password,
        });
    } else if (user && !user.checkPassword(password)) {
        throw new AuthError();
    }

    let userr = await user.save();
    return userr;
};

class AuthError extends Error {
    constructor(message) {
        super(message);
    }
}
AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;

var User = mongoose.model('User', schema);
exports.User = User;
