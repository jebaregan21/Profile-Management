const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtPassword = require('../config/jwtPassword');
const verify = require('../middleware/verify');

router.get('/auth/check',(req,res)=>{
    const token = req.cookies['jtoken'];
    let check = false;
    if(token){
        jwt.verify(token,jwtPassword,(err,decoded)=>{
            if(err){
                console.log(err);
                res.sendStatus(400);
            }
            else{
                if(decoded.gauth===true){
                   verify(decoded.token).then(()=>{
                       check = true;
                       res.json({userId:decoded.userId, name:decoded.name});
                   })
                   .catch(err=>{
                       console.log(err);
                       check = false;
                       res.sendStatus(204);
                   })
                }
                else{
                    res.json({userId:decoded.userId, name:decoded.name});
                }
            }
        })
    }
})

module.exports = router;