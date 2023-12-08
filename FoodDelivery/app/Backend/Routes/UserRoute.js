const express=require('express')

const router =express.Router()

const User=require('../Models/User')

const {body,validationResult} = require('express-validator')


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = "MyNameIsAnukulMaityMyFavouriteCricketerIsViratKohli"

router.post('/createUser',
body('email','emaill format is wrong kindly fix it ').isEmail(),
body('password','Password Should Be Atleast 6 Characters').isLength({min: 5}),
async(req,resp)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return resp.status(400).json({errors:errors.array()})
    }

    const salt = await bcrypt.genSalt(10)
    let hashedPassword=await bcrypt.hash(req.body.password,salt)

    try{
        const {name,email,location}=req.body
       await User.create({
            name:name,
            password:hashedPassword,
            email:email,
            location:location
        })
        resp.json({success:true})
    }catch(err){
        console.log(err);
        resp.json({success:false})
    }
})


router.post('/loginuser',
body('email','emaill format is wrong kindly fix it ').isEmail(),
body('password','Password Should Be Atleast 6 Characters').isLength({min: 5}),
async(req,resp)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return resp.status(400).json({errors:errors.array()})
    }

    try{
        const email=req.body.email;
        const user=await User.findOne({email})

        if(!user){
            return resp.status(400).json({error:"Email Not Found"})
        }
        const passwordComparision = await bcrypt.compare(req.body.password,user.password)
        if(!passwordComparision){
            return resp.status(400).json({error:"Incorrect Password"})
        }
        
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,secretKey)
        return resp.json({success:true,authToken:authToken})
    }catch(err){
        console.log(err);
        resp.json({success:false})
    }
})

module.exports=router