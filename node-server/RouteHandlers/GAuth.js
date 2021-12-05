const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verify = require('../middleware/verify');
const jwt = require('jsonwebtoken');
const jwtPassword = require('../config/jwtPassword')

router.post('/gauth', async function(req,res){
    const token = req.body.token;
    const email = req.body.email;
    const user = await User.findOne({email:email}).exec();
    verify(token).then(()=>{
        if(!user){
            res.sendStatus(201);
        }
        else{
            const cookieName = 'jtoken';
            const jwtToken = jwt.sign({userId:user._id, name:user.name, email:user.email, gauth:true, token:token},jwtPassword,{expiresIn : 432000});
            res.cookie(cookieName,jwtToken,{httpOnly:true, maxAge : 432000, sameSite:'lax'});
            res.sendStatus(200);
        }
    })
    .catch(err=>{
        console.log(err);
        res.sendStatus(400);
    });
})

module.exports = router;