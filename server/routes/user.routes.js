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

        const subsUser = await User.findOne({login});
        if (type === 'recommended'){
            user.subscriptions = [{login, avatar}, ...user.subscriptions];
            subsUser.subscribers = [...subsUser.subscribers, {login: userLogin, avatar: user.avatar}]

        }else if (type === 'subscription'){
            const deleted = user.subscriptions.findIndex(item => item.login === login);
            user.subscriptions.splice(deleted, 1);

            const deletedRecommended =  subsUser.subscribers.findIndex(item => item.login === userLogin);
            subsUser.subscribers.splice(deletedRecommended, 1);
        }

        await user.save();
        await subsUser.save()

        res.status(200).json({success: true})
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
})


module.exports = router;