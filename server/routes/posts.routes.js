const {Router} = require('express');
const router = Router();
const User = require('../models/user');
const Post = require('../models/post');


router.post('/users', async (req, res) => {
    try {
        const {login} = req.body;

        if (login === req.user.login) {
            const user = await req.user.populate('posts.items.post').execPopulate();
            const filteredPosts = user.posts.items.map(item => item.post);
            res.status(200).json({posts: filteredPosts})
        } else {
            const user = await User.findOne({login})
            const userWithPosts = await user.populate('posts.items.post').execPopulate();
            const filteredPosts = userWithPosts.posts.items.map(item => item.post);
            res.status(200).json({
                posts: filteredPosts,
                userInfo: {subscriptions: user.subscriptions || [], subscribers: user.subscribers || []}
            })
        }
    } catch (e) {
        res.status(500).json({message: 'Серверная ошибка'})
        console.log(e);
    }
})


router.post('/all', async (req, res) => {
    try {
        const {login, length} = req.body;

        const user = await User.findOne({login});

        const neededPostsOwners = user.subscriptions.map(item => item.login);

        const neededPostOwnerAvatars = user.subscriptions.map(item => ({avatar: item.avatar, login: item.login}));


        const neededPosts = await Post.find({ownerLogin: neededPostsOwners});


        const posts = [...neededPosts].map(item => {
            const avatar = neededPostOwnerAvatars.find(elem => elem.login === item.ownerLogin).avatar;

            return {...item._doc, avatar}
        })


        if (length <= posts.length) {
            posts.length = length;
            res.status(200).json({posts, isAllPosts: false});
        } else {
            res.status(200).json({posts, isAllPosts: true});
        }

    } catch (e) {
        res.status(500).json({message: 'Серверная ошибка'})
        console.log(e);
    }
})
module.exports = router;