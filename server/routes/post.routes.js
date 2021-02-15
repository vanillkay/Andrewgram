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

router.post('/like', async (req, res) => {
    try{
        const {id, likerLogin} = req.body;

        const post = await Post.findOne({_id: id});

        if (!!post.likes.find(item => item.owner === likerLogin)){
            const idx = post.likes.findIndex(item => item.owner === likerLogin);
            post.likes.splice(idx, 1);
        }else{
            post.likes.push({owner: likerLogin});
        }

       await post.save();

        res.status(200).json({success: true})
    }catch (e) {
        res.status(500).json({message: 'Серверная ошибка'})
        console.log(e);
    }
})

router.post('/comment', async (req, res) => {
    try{
        const {id, owner, comment} = req.body;

        const post = await Post.findOne({_id: id});

        post.comments.push({owner, text: comment});

        await post.save();

        res.status(200).json({success: true})
    }catch (e) {
        res.status(500).json({message: 'Серверная ошибка'})
        console.log(e);
    }
})

module.exports =  router;