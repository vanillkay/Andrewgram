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
    posts: {
        items: [
            {
                post: {
                    type: Schema.Types.ObjectId,
                    ref: 'Post',
                    required: true,
                }
            }
        ]
    },
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

userSchema.methods.addPost = function (post) {
    const newPosts = [...this.posts.items];

    newPosts.push({post});

    this.posts.items = newPosts;

    return this.save();
}


module.exports = model('User', userSchema);