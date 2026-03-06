const mongoose = require("mongoose")

const ledgerSchema = new mongoose.Schema({
    account:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Account is required for creating ledger"],
        immutable:true,
        index:true
    } ,
    transaction:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"transaction",
        required:[true,"Transaction is required for creating ledger"],
        immutable:true,
        index:true
    },
    amount:{
        type:Number,
        min : [0,"Amount can't be negative"],
        required : true,
        immutable:true
    },
    type:{
        type:String,
        enum : {
            values:["credit","debit"],
            message:"type can only be credit or debit"
        },
        immutable:true,
        required:[true,"ledger type is required"]
    }
})

function preventLedgerModification(){
    throw new Error("ledger can't be modified")
}

ledgerSchema.pre("findOneAndUpdate",preventLedgerModification)
ledgerSchema.pre("updateOne",preventLedgerModification)
ledgerSchema.pre("deleteOne",{document:true,query:true},preventLedgerModification)
ledgerSchema.pre("deleteMany",preventLedgerModification)
ledgerSchema.pre("findOneAndDelete",preventLedgerModification)
ledgerSchema.pre("findOneAndReplace",preventLedgerModification)
ledgerSchema.pre("replaceOne",preventLedgerModification)

const ledgerModel = mongoose.model("ledger",ledgerSchema)

module.exports = ledgerModel