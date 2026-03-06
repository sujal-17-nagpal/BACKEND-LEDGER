const express = require("express")
const { isAuth } = require("../middleewares/auth.middleware")
const {createAccount} = require("../controllers/account.controller")

const accountRouter = express.Router()

accountRouter.post("/create-account",isAuth,createAccount)

module.exports = accountRouter