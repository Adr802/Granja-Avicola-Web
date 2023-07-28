const data = require('../controllers/data.js');
const express=require('express');
const router=express.Router();

router.get('/temperature',data.getTemperature);
router.get('/humedad',data.getHumedad);

module.exports=router;