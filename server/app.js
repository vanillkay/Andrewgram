//Project variables
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const csrf = require('csurf');
const cookieParser = require('cookie-parser')
const helmet = require('helmet');
const path = require('path');
const fileMiddleware = require('./middlewares/file');
const userMiddleware = require('./middlewares/user');
const session = require('express-session');


//keys variables
const keys = require('../keys');


const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const postsRoutes = require('./routes/posts.routes');
const userRoutes = require('./routes/user.routes');


const MongoStore = require('connect-mongodb-session')(session);
const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
})


app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use(fileMiddleware.single('avatar'))

app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));

app.use(express.json());
const csrfProtection = csrf({cookie: true});
app.use(cookieParser());
app.use(helmet());

app.use(userMiddleware);




// app.use(helmet.contentSecurityPolicy({
//     directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',],
//         styleSrc: ["'self'", 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css'],
//         imgSrc: ["'self'", '*']
//     }
// }));

// app.use(csrfProtection, (req, res, next) => {
//
//     const token = req.csrfToken();
//     res.cookie('XSRF-TOKEN', token);
//     res.locals.csrfToken = token;
//
//     next();
// });

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/posts', postsRoutes);
app.use('/user', userRoutes);


app.get('/csrf', csrfProtection, (req, res) => {
    res.json({token: req.csrfToken()})
})



async function start() {
    try {

        //connection to mongoDB
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        //starting server
        app.listen(keys.PORT, () => {
            console.log(`Server has been started on port ${keys.PORT} ...`);
        });
    } catch (e) {

        //logging error
        console.log(e)
    }
}


//starting project
start()


