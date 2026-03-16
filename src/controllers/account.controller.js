const accountModel = require("../models/account.model")

const createAccount = async(req,res)=>{
    const user = req.user

    const account = await accountModel.create({
        user : user._id
    })

    res.status(201).json({
        message : "account created",
        account
    })
}

const getUserAccounts = async(req,res)=>{
    const user = req.user

    const allAccounts = await accountModel.find({user : user._id})

    res.json(200).json({
        message : "accounts fetched successfulyy",
        allAccounts
    })
}

module.exports = {createAccount,getUserAccounts}