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
            imageSrc: {
                type: String,
                required: true,
            },
            info: {
                type: String
            },
            created: {
                type: Date,
                required: true,
                default: Date.now
            },
            comments: [
                {
                    owner: {
                        type: String,
                        required: true
                    },
                    text: {
                        type: String,
                        required: true
                    }
                }
            ],
            likes: [
                {
                    owner: {
                        type: String,
                        required: true
                    },
                }
            ]
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