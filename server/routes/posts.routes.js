const {Router} = require('express');
const router = Router();
const Post = require('../models/post');


router.post('/users', async (req, res) => {
    try{
        const {login} = req.body;

        if (login === req.user.login){
            const user = await req.user.populate('posts.items.post').execPopulate();
            const filteredPosts = user.posts.items.map(item => item.post);
            console.log(filteredPosts);
            res.status(200).json(filteredPosts)
        }else{
            res.status(200).json({posts: 'hello'})
        }
    }catch (e) {
        res.status(500).json({message: 'Серверная ошибка'})
        console.log(e);
    }
})
module.exports =  router;