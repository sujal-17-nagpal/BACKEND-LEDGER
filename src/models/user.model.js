const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required : [true,"username is required for creating account"],
        unique : [true,"user with this username already exists"],
    },
    email:{
        type:String,
        required : [true,"email is required for creating account"],
        unique : [true,"user with this email already exists"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Invalid email"],
        trim : true,
        lowercase: true
    },
    password:{
        type:String,
        required : [true,"password is required for creating account"],
        minlength:[6,"Password should be of minimum 6 length"],
        select : false
    },
    systemUser:{
        type : Boolean,
        default:false,
        immutable : true,
        select : false
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return
    }
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash
    return
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model("user",userSchema)

module.exports = userModel