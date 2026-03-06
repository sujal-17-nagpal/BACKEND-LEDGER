const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        req : [true,"Username is required to create an account"],
        index : true
    },
    status:{
        type:String,
        enum :{
            values : ["active","frozen","closed"],
            message :"Status can be either active, frozen or closed",
            
        },
        default:"active"
       
    },
    currency:{
        type : String,
        required : [true,"Currency is required to create an account"],
        default : "INR",
    }
},{
    timestamps : true   
})

accountSchema.index({user : 1,status : 1})

const accountModel = mongoose.model("account",accountSchema)

module.exports = accountModel