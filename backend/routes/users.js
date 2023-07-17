const express=require('express');
const router=express.Router();
router.get('/users',(req,res) => {
    const data= ["Hola","MUNDO"]
    res.send({data})
});
module.exports=router;