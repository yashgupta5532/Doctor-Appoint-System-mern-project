const mongoose =require('mongoose')

const appointmentSchema=new mongoose.Schema({
    userId:{
        type:String,
        requied:true
    },
    doctorId:{
        type:String,
        requied:true
    },
    doctorInfo:{
        type:String,
        requied:true
    },
    userInfo:{
        type:String,
        requied:true
    },
    date:{
        type:String,
        requied:true
    },
    status:{
        type:String,
        requied:true,
        default:"pending"
    },
    time:{
        type:String,
        requied:true
    }
},{timestamps:true})

const appointmentModel=mongoose.model("appointments",appointmentSchema)
module.exports=appointmentModel