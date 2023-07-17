const data = require('../controllers/data.js');
const express=require('express');
const router=express.Router();

router.get('/',data.getData);

module.exports=router;