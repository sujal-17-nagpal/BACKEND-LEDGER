const express = require("express")
const { createTransactions, createInitialFundsTransaction } = require("../controllers/transaction.contoller")
const { isAuth, isSystemUserAuth } = require("../middleewares/auth.middleware")

const transactionRouter = express.Router()

transactionRouter.post("/",isAuth,createTransactions)
transactionRouter.post("/system/initial-funds",isSystemUserAuth,createInitialFundsTransaction)

module.exports = transactionRouter