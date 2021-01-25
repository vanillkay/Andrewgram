
//Project variables
const express = require('express');
const app = express();
const mongoose = require('mongoose');


//keys variables
const keys = require('../keys');



const authRoutes = require('./routes/auth.routes');






app.use(express.json());

app.use('/auth', authRoutes);



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


