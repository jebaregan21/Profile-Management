const express = require('express');
const router = express.Router();

router.get('/logout',(req,res)=>{
    console.log("Logout called");
    res.cookie('jtoken','',{maxAge:0});
    res.sendStatus(200);
})

module.exports = router;