const {Router} = require('express');
const User = require('../models/user');
const router = Router();
const bcrypt = require('bcryptjs')

const {validationResult} = require('express-validator');
const {registerValidators, loginValidators} = require('../utils/validators');



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

        res.status(200).json({user});


    } catch (e) {
        res.status(500).json({message: 'Серверная ошибка'})
        console.log(e);

    }
})


module.exports = router;