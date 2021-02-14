const {Router} = require('express');
const User = require('../models/user');
const router = Router();
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

const {validationResult} = require('express-validator');
const {registerValidators, loginValidators, resetPasswordValidators, emailValidators} = require('../utils/validators');

const keys = require('../../keys');
const resetEmail = require('../emails/reset');


router.post('/register', registerValidators, async (req, res) => {
    try {


        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({message: errors.array()[0].msg})
        }

        const {email, login, password, name} = req.body;


        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email, name, password: hashPassword, login
        })

        await user.save();

        res.status(200).json({user});
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
});


router.post('/login', loginValidators, async (req, res) => {
    try {

        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            return res.status(422).json({message: errors.array()[0].msg})
        }

        const {login} = req.body;


        const user = await User.findOne({login});

        const allUsers = await User.find({});

        const subs = user.subscriptions.map(item => ({login: item.login}));

        const filteredUser = allUsers.filter(item => item.login !== user.login && !subs.some(el => el.login === item.login));

        const recommended = filteredUser.map(item => ({login: item.login, avatar: item.avatar}))

        const userInfo = {
            email: user.email,
            name: user.name,
            login: user.login,
            subscriptions: user.subscriptions,
            posts: user.posts,
            subscribers: user.subscribers,
            avatar: user.avatar,
            recommended
        }

        req.session.user = user;
        req.session.isAuth = true;
        req.session.save(err => {
            if (err) throw err;
            res.status(200).json({userInfo});
        })


    } catch (e) {
        res.status(500).json({message: 'Серверная ошибка'})
        console.log(e);

    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) res.status(500).json({err})
        res.status(200).json({success: true})
    })
})

router.post('/reset', emailValidators, async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({message: errors.array()[0].msg})
        }

        crypto.randomBytes(32, async (err, buf) => {
            if (err) {
                return res.status(500).json({error: "Error with crypto"});
            }

            const token = buf.toString('hex');

            const {email} = req.body;

            const candidate = await User.findOne({email});

            candidate.resetToken = token;
            candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
            await candidate.save();
            sgMail.setApiKey(keys.SENDGRID_API_KEY);

            const msg = await sgMail.send(resetEmail(email, token))

            if (msg[0].statusCode === 202) {
                res.status(202).json({success: true});
            } else {
                throw new Error('email error')
            }

        })
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
});

router.post('/reset/check', async (req, res) => {
    try {
        const {token} = req.body;

        const user = await User.findOne({resetToken: token, resetTokenExp: {$gt: Date.now()}});

        if (user) {
            res.status(200).json({success: true});
        } else {
            res.status(200).json({success: false});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
});

router.post('/reset/password', resetPasswordValidators, async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({message: errors.array()[0].msg})
        }

        const {password, token} = req.body;

        const user = await User.findOne({resetToken: token})

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.resetTokenExp = undefined;
        await user.save();

        res.status(200).json({success: true});


    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
})

module.exports = router;