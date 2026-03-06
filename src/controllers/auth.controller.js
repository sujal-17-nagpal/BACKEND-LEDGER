const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const { sendRegistrationEmail } = require("../services/email.service")

const registerUser = async(req,res) =>{
    const {userName,email,password} = req.body

    const existingUser = await userModel.findOne({email})

    if(existingUser){
        return res.status(422).json({message : "user with this email already exists"})
    }

    const user = await userModel.create({email,password,userName})

    const token = jwt.sign({userId : user._id},process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"Register successful",
        user:{
            userId : user._id,
            email : user.email,
            userName : user.userName
        },
        token
    })

    await sendRegistrationEmail(user.email,user.userName)
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body

    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({message : "email or password is incorrect"})
    }

    const isValidPassword = await user.comparePassword(password)
    if(!isValidPassword){
        return res.status(401).json({message : "email or password is incorrect"})
    }

    const token = jwt.sign({userId : user._id},process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"login successful",
        user:{
            userId : user._id,
            email : user.email,
            userName : user.userName
        },
        token
    })
}

module.exports = {registerUser,loginUser}