const {Router} = require('express');
const router = Router();

router.post('/new', async (req, res) => {
    try{

        console.log(req.file)
        res.json({path: req.file.path})
    }catch (e){

    }
})

module.exports =  router;