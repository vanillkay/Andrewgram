const {Router} = require('express');
const router = Router();
const User = require('../models/user');


router.post('/avatar', async (req, res) => {
    try {
        const {user} = req.body;


        const neededUser = await User.findOne({login: user});

        neededUser.avatar = req.file.path;

        await neededUser.save()

        res.status(200).json({path: req.file.path})


    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
})

router.post('/subs', async (req, res) => {
    try {
        const {login, avatar, type, userLogin} = req.body;

        const user = await User.findOne({login: userLogin});
        if (type === 'recommended'){
            user.subscriptions = [{login, avatar}, ...user.subscriptions];

        }else if (type === 'subscription'){
            const deleted = user.subscriptions.findIndex(item => item.login === login);
            user.subscriptions.splice(deleted, 1);
        }

        await user.save();

        res.status(200).json({success: true})
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
})


module.exports = router;