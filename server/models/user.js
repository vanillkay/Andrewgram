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
    },
    posts: [
        {
            owner: {
                type: String,
                required: true
            },
        }
    ],
    subscriptions: [
        {
            login: {
                type: String,
                required: true
            },
        }
    ],
    subscribers: [
        {
            login: {
                type: String,
                required: true
            },
        }
    ]


})


module.exports = model('User', userSchema);