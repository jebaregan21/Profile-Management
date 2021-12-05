const express = require('express');
const jwt = require('jsonwebtoken');
const jwtPassword = require('../config/jwtPassword');
const multer = require('multer');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/settings',(req,res)=>{
    const token = req.cookies['jtoken'];
    if(token===null || token===undefined){
        res.sendStatus(401);
    }
    else{
        const decoded = jwt.verify(token,jwtPassword);
        if(decoded===null||decoded===undefined){
            res.sendStatus(401);
        }
        else{
            User.findById(decoded.userId,'name email mobile address occupation city state country pincode company gauth',(err,data)=>{
                if(err)
                    console.log(err);
                else{
                    res.json({user:data});
                }
            })
        }
    }
})

const fileStorage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'.\\images\\profile');
    },
    filename : (req,file,callback)=>{
        callback(null,req.body.userId+'.jpg');
    }
})

const upload = multer({storage:fileStorage});

router.post('/settings/profile',upload.single('image'),(req,res)=>{
    res.sendStatus(200);
})

const fileStorage2 = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'.\\images\\company');
    },
    filename : (req,file,callback)=>{
        callback(null,req.body.userId+'.jpg');
    }
})

const upload2 = multer({storage:fileStorage2});

router.post('/settings/companypic',upload2.single('image'),(req,res)=>{
    res.sendStatus(200);
})

router.post('/settings/:field',(req,res)=>{
    const field = req.params.field;
    let bypass = true;
    let emailChange = false;
    console.log(field, req.body);
    User.findById(req.body.user._id,(err,user)=>{
        if(err)
        console.log(err);
        else if(field==='email'){
            user.email = req.body.email;
            emailChange = true;
        }
        else if(field==='mobile'){
            user.mobile = req.body.mobile;
        }
        else if(field==='address'){
            user.address=req.body.door+', '+req.body.street+', '+req.body.area;
            user.city = req.body.city;
            user.state = req.body.state;
            user.country = req.body.country;
            user.pincode = req.body.pincode;
        }
        else if(field==='occupation'){
            user.occupation = req.body.occupation;
        }
        else if(field==='company'){
            user.company = req.body.company;
        }
        else if(field==='name'){
            user.name = req.body.uname;
        }
        else if(field==='password'){
            const check = bcrypt.compareSync(req.body.oldpassword,user.password);
            if(check===true){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password,salt);
                user.password = hash;
            }
            else{
                bypass = false;
                res.sendStatus(401);
            }
        }
        if(bypass===true){
            user.save(err=>{
                if(err)
                    console.log(err);
                else{
                    if(emailChange===true){
                        res.sendStatus(201);
                    }
                    else{
                        res.sendStatus(200);
                    }
                }
            })
        }
    });
})

module.exports = router;