const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        req : [true,"transaction must be associated with an account"],
        index : true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        req : [true,"transaction must be associated to an account"],
        index : true
    },
    status:{
        type:String,
        enum : {
            values:["pending , complete , failed,reversed"],
            message:"transaction can be pending , complete , failed or reverse"
        },
        default:"pending"
    },
    amount:{
        type:Number,
        min:[0,"Amount can't be negative"],
        req:[true,"amount is required for transaction"]
    },
    idempotencyKey:{
        type:String,
        required:[true,"idempotency key is required"],
        index:true,
        unique:true
    }
},{timestamps:true}) 

const transactionModel = mongoose.model("transaction",transactionSchema)

module.exports = transactionModel