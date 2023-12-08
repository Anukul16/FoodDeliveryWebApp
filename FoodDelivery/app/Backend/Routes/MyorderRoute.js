
const express=require('express');
const router =express.Router()
const Order = require('../Models/Orders')


router.post("/myOrders",async(req,resp)=>{
    try{
        let order = await Order.findOne({email:req.body.email})
        resp.json({orderData:order})
    }catch(err){
        resp.send("Server Error",err.message)
    }
})


module.exports=router