const express=require('express');
const router=express.Router();
router.get('/data',(req,res) => {
    const data= ["Hola","MUNDO DATOS"]
    res.send({data})
});
module.exports=router;