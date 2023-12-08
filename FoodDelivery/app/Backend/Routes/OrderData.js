const express=require('express');
const Order = require('../Models/Orders')
const router =express.Router()


router.post('/orderData',async(req,resp)=>{
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    let emailId=await Order.findOne({'email':req.body.email})
    console.log(emailId);
    if(emailId === null){
        try{
            await Order.create({
                email:req.body.email,
                order_data: [data]
            }).then(()=>{
                resp.json({success:true})
            })
        }catch(err){
            console.log(err.message);
            resp.send("Server Error: ",error.message)
        }
    }else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
            {
                $push: {order_data:data}
            }).then(()=>{
                resp.json({success:true})
            })
        }catch(error){
            resp.send("Server Error: ",error.message)
        }
    }   
})





module.exports=router