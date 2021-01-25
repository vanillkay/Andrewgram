const {body} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs')





exports.loginValidators = [
    body('login')
        .custom(async (login, {req}) => {
            try {
                const candidate = await User.findOne({login});
                if (!candidate) {
                    return Promise.reject('Такого пользователя не существует')
                }
            } catch (e) {
                console.log(e);
            }
        }),
    body('password', 'Неверный пароль')
        .isLength({min: 7, max: 56})
        .isAlphanumeric()
        .custom(async (password, {req}) => {
            try{
                const user = await User.findOne({login: req.body.login});

                if (!user){
                    return Promise.reject('Такого пользователя не существует')
                }
                const isSamePass = await bcrypt.compare(password, user.password);

                if (!isSamePass){
                    return Promise.reject('Неверный пароль')
                }
            }catch (e) {
                console.log(e);

            }
        })

];

exports.registerValidators = [
    body('login')
        .custom(async (login, {req}) => {
            try {
                const candidate = await User.findOne({login})
                if (candidate) {
                    return Promise.reject('Такой логин уже занят')
                }
            } catch (e) {
                console.log(e);
            }
        }),
    body('email')
        .isEmail()
        .withMessage('Введите корректный email')
        .custom(async (email, {req}) => {
            try {
                const candidate = await User.findOne({email})
                if (candidate) {
                    return Promise.reject('Такой email уже занят')
                }
            } catch (e) {
                console.log(e);
            }
        })
        .normalizeEmail(),
    body('password', 'Пароль должен быть минимум семь символов')
        .isLength({min: 7, max: 56})
        .isAlphanumeric()
        .trim(),
    body('rePassword')
        .custom((repeat, {req}) => {
            if (repeat !== req.body.rePassword) {
                throw new Error('Пароли должны совпадать')
            }
            return true;
        })
        .trim(),
];