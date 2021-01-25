const {Router} = require('express');
const User = require('../models/user');

const router = Router();

router.post('/register', async (req, res) => {
    try {


        const {email, login, password, name} = req.body;

        const user = new User({
            email, name, password, login
        })
        await user.save();

        res.json({message: "jopa"});
    } catch (e) {
        console.log(e);
    }
})


module.exports = router;