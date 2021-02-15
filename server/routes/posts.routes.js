const {Router} = require('express');
const router = Router();
const User = require('../models/user');


router.post('/users', async (req, res) => {
    try{
        const {login} = req.body;

        if (login === req.user.login){
            const user = await req.user.populate('posts.items.post').execPopulate();
            const filteredPosts = user.posts.items.map(item => item.post);
            res.status(200).json(filteredPosts)
        }else{
            const user = await User.findOne({login})
            const userWithPosts = await user.populate('posts.items.post').execPopulate();
            const filteredPosts = userWithPosts.posts.items.map(item => item.post);
            res.status(200).json(filteredPosts)
        }
    }catch (e) {
        res.status(500).json({message: 'Серверная ошибка'})
        console.log(e);
    }
})


router.post('/all', async (req, res) => {
    try{
        const {login} = req.body;

    }catch (e) {
        res.status(500).json({message: 'Серверная ошибка'})
        console.log(e);
    }
})
module.exports =  router;