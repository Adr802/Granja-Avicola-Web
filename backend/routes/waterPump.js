const express=require('express');
const router=express.Router();
router.get('/waterPump',(req,res) => {
    const data= ["Hola","MUNDO WATER"]
    res.send({data})
});
module.exports=router;