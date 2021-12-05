const express = require('express');
const router = express.Router();
const verify = require('../middleware/verify');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtPassword = require('../config/jwtPassword');
const bcrypt = require('bcrypt');

router.post('/create/gauth',async function(req,res){
    verify(req.body.id).then(()=>{
        let user = new User({
            name : req.body.name,
            password : req.body.password,
            email : req.body.email,
            mobile : req.body.mobile,
            address : req.body.door+", "+req.body.street+", "+req.body.area,
            occupation : req.body.occupation,
            city : req.body.city,
            state : req.body.state,
            country : req.body.country,
            pincode : req.body.pincode,
            company : req.body.company,
            gauth : true
        });
        const token = req.body.id;
        user.save((err,data)=>{
            if(err){
                console.log(err);
                res.sendStatus(400);
            }
            else{
                console.log(data);
                const jwtToken = jwt.sign({userId:user._id, name:user.name, email:user.email, gauth:true, token:token},jwtPassword,{expiresIn : 432000});
                res.cookie('jtoken',jwtToken,{httpOnly:true, sameSite:'lax', maxAge : 432000});
                console.log(user._id.toString());
                res.json({userId:user._id.toString()});
            }
        })
    })
    .catch(err=>{
        console.log(err);
        res.sendStatus(400);
    })
})

router.post('/create',async function(req,res){
    const salt = bcrypt.genSaltSync(10);
    console.log(salt);
    const hash = bcrypt.hashSync(req.body.password,salt);
    console.log(hash);
    let user = new User({
        name : req.body.name,
        password : req.body.password,
        email : req.body.email,
        password : hash,
        mobile : req.body.mobile,
        address : req.body.door+", "+req.body.street+", "+req.body.area,
        occupation : req.body.occupation,
        city : req.body.city,
        state : req.body.state,
        country : req.body.country,
        pincode : req.body.pincode,
        company : req.body.company,
        gauth : false
    });
    user.save((err,data)=>{
        if(err){
            console.log(err);
            res.sendStatus(400);
        }
        else{
            console.log(data);
            const jwtToken = jwt.sign({userId:user._id, name:user.name, email:user.email, gauth:false},jwtPassword,{expiresIn : 432000});
            res.cookie('jtoken',jwtToken,{httpOnly:true, sameSite:'lax', maxAge : 432000});
            res.sendStatus(200);
        }
    })
})

module.exports = router;