const express = require("express")
const { isAuth } = require("../middleewares/auth.middleware")
const {createAccount, getUserAccounts} = require("../controllers/account.controller")

const accountRouter = express.Router()

accountRouter.post("/create-account",isAuth,createAccount)

accountRouter.get("/getAccounts",isAuth,getUserAccounts)

module.exports = accountRouter