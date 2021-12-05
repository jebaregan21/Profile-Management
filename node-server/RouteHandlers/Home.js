const express = require('express')
const router = express.Router();
const User = require('../models/User');

router.get('/', async function(req,res){
    let users = await User.find({},'name occupation company city');
    res.json(users);
});

router.post('/',async function(req,res){
    let name = req.body.name;
    if(name===undefined || name === null || name===''){
        let users = await User.find({},'name occupation company city');
        res.json(users);
    }
    else{
        let users = await User.find({name:{$regex:name,$options:'i'}},'name occupation company city');
        res.json(users);
    }
});

module.exports = router;