const {Router} = require('express');
const router = Router();
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');



router.post('/new', async (req, res) => {
    try{
        const {user, info = ''} = req.body;

        const neededUser = await User.findOne({login: user});


        const newPost = {
            owner: neededUser.login,
            imageSrc: req.file.path,
            info,
            id: uuidv4()

        }

        console.log(newPost);

        neededUser.posts = [newPost, ...neededUser.posts];

        await neededUser.save();

        res.status(202).json({post: newPost})

    }catch (e){
        console.log(e)
    }
})

module.exports =  router;