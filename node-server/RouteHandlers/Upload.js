const express = require('express');
const router = express.Router();
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'.\\images\\profile');
    },
    filename : (req,file,callback)=>{
        console.log(req.body);
        callback(null,req.body.userId+'.jpg');
    }
})

const upload = multer({storage:fileStorage});

router.post('/upload/profile',upload.single('image'),(req,res)=>{
    res.sendStatus(200);
})

const fileStorage2 = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'.\\images\\company');
    },
    filename : (req,file,callback)=>{
        console.log(req.body);
        callback(null,req.body.userId+'.jpg');
    }
})

const upload2 = multer({storage:fileStorage2});

router.post('/upload/company',upload2.single('image'),(req,res)=>{
    res.sendStatus(200);
})

module.exports = router;
