const mongoose=require('mongoose')

const doctorSchema=new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        required:[true,'firstName is required']
    },
    lastName:{
        type:String,
        required:[true,'LastName is required']
    },
    phone:{
        type:String,
        required:[true,'Phone number is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    website:{
        type:String
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    specialization:{
        type:String,
        required:[true,'specialization is required']
    },
    experience:{
        type:String,
        required:[true,'experience is required']
    },
    feePerCounselling:{
        type:Number,
        required:[true,'fee is required']
    },
    status:{
        type:String,
        default:"Pending"
    },
    timing:{
        type:Object,
        required:[true,'work time is required']
    },

},{timestamps:true})


const doctorModel=mongoose.model('doctors',doctorSchema);
module.exports=doctorModel