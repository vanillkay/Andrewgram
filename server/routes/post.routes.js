const {Router} = require('express');
const router = Router();
const Post = require('../models/post');




router.post('/new', async (req, res) => {
    try{
        const {info = ''} = req.body;

        const user = req.session.user;


        const newPost = {
            owner: user,
            ownerLogin: user.login,
            imageSrc: req.file.path,
            info,
        }



        const post = new Post(newPost);

        await post.save();

        await req.user.addPost(post);

        res.status(202).json({post})

    }catch (e){
        res.status(500).json({message: 'Серверная ошибка'})
        console.log(e);
    }
})

module.exports =  router;