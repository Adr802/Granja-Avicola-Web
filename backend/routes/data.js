const data = require('../controllers/data.js');
const express=require('express');
const router=express.Router();

router.get('/',data.getDatas);

module.exports=router;