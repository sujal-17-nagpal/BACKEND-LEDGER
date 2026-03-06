const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const isAuth = async(req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message : "Unauthorized"})
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

module.exports = {isAuth}