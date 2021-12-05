const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtPassword = require('../config/jwtPassword');

router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    User.findOne({email:email},(err,user)=>{
        if(err){
            console.log(err);
            res.sendStatus(204);
        }
        else if(user===undefined || user===null || user==='')
            res.sendStatus(204);
        else if(user.gauth===true)
            res.sendStatus(204);
        else{
            const check = bcrypt.compareSync(password,user.password);
            console.log(check);
            if(check===true){
                const jwtToken = jwt.sign({userId:user._id,name:user.name,gauth:false, email:user.email},jwtPassword,{expiresIn : 432000});
                res.cookie('jtoken',jwtToken,{httpOnly:true, sameSite:'lax', maxAge : 432000});
                res.sendStatus(200);
            }
            else{
                res.sendStatus(204);
            }
        }
    })
})

module.exports = router;