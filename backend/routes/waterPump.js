const waterPump = require('../controllers/waterPump');
const express=require('express');
const router=express.Router();

router.get('/',waterPump.getEvents);

module.exports=router;