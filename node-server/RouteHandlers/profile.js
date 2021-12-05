const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const jwtPassword = require('../config/jwtPassword');
const User = require('../models/User');

router.get('/profile/:id',async function(req,res){
    const token = req.cookies['jtoken'];
    const decoded = jwt.verify(token,jwtPassword);
    if(decoded){
        const user = await User.findById(req.params.id,'name email mobile address occupation city state country pincode company');
        if(user===null || user===undefined){
            res.sendStatus(404);
        }
        else{
            let check = false;
            if(decoded.userId===user._id.toString()){
                check = true;
            }
            let result = {
                user,
                myprofile : check
            };
            res.json({data:result});
        }
    }
    else{
        res.sendStatus(401);
    }
});

router.post('/settings/profile',)

module.exports = router;