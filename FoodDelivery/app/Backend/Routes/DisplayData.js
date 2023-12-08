const express=require('express');
const mongoDB = require('../db');

const router =express.Router()


router.post('/foodData',async (req,resp)=>{

    try{
        await mongoDB()
        // console.log("FoodCategory:",global.foodCategory);
        resp.send([global.food_items,global.foodCategory])
    }catch(err){
        console.error(err.message);
        resp.send("Server Error")
    }
})


module.exports=router