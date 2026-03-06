const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const isAuth = async(req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(403).json({message : "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId)

        req.user = user
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(403).json({message : "Unauthorized"})
    }
}

const isSystemUserAuth = async(req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(403).json({message : "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId).select("+systemUser")

        if(!user.systemUser){
            return res.status(403).json({message : "Unauthorized"})
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(403).json({message : "Unauthorized"})
    }
}

module.exports = {isAuth,isSystemUserAuth}