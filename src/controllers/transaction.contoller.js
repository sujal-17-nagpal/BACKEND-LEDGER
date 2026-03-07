const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")

const emailService = require("../services/email.service")
const accountModel = require("../models/account.model")
const mongoose = require("mongoose")

const createTransactions = async(req,res)=>{
    const {fromAccount,toAccount,amount,idempotencyKey} = req.body

    
}

const createInitialFundsTransaction = async(req,res)=>{
    const {toAccount,amount,idempotencyKey} = req.body

    if(!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({message :"required fields are missing"})
    }

    const account = await accountModel.findOne({
        _id : toAccount
    })

    if(!account){
        return res.status(404).json({message :"no account exists "})
    }

    // this is a system account to provide initial funds
    const fromAccount = await accountModel.findOne({
        user : req.user._id,
    })

    if(!fromAccount){
        return res.status(400).json({message:"system accout is missing"})
    }


    // to maintain atomicity , sessions are user 
    // either all the process inside session will be executed
    // if some error occurs all of them returns to their inital state

    const session = await mongoose.startSession()
    session.startTransaction()

    const transaction = new transactionModel({
        fromAccount : fromAccount._id,
        toAccount,
        status : "pending",
        amount,
        idempotencyKey
    })

    const debitLedgerEntry = await ledgerModel.create([{
        account : fromAccount._id,
        amount,
        transaction : transaction._id,
        type : "debit"
    }],{session})

    const creditLedgerEntry = await ledgerModel.create([{
        account : toAccount,
        amount,
        transaction : transaction._id,
        type : "credit"
    }],{session})

    transaction.status = "complete"
    await transaction.save({session})

    await session.commitTransaction()
    session.endSession()

    return res.status(200).json({
        message : "initial funds transaction completed",
        transaction : transaction
    })
}


module.exports = {createTransactions,createInitialFundsTransaction}