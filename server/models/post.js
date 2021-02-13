const {Schema, model} = require('mongoose');


const postSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    imageSrc: {
        type: String,
        required: true
    },
    info: String,
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    ownerLogin: {
        type: String,
        required: true
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

})

module.exports = model('Post', postSchema);