const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
    },
    resetToken: String,
    resetTokenExp: Date,
    email: {
        type: String,
        required: true
    },
    name: String,
    password: {
        type: String,
        required: true
    }
})


module.exports = model('User', userSchema);