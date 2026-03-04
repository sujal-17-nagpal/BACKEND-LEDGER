const mongoose = require("mongoose")

const connectDb = async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("db connected")
    }).catch(error =>{
        console.log("error connecting to db")
        process.exit(1)
    })
}

module.exports = connectDb