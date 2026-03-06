const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")

const emailService = require("../services/email.service")

const createTransactions = async(req,res)=>{
    const {fromAccount,toAccount,amount,idempotencyKey} = req.body


}

const createInitialFundsTransaction = async(req,res)=>{

}

module.exports = {createTransactions,createInitialFundsTransaction}