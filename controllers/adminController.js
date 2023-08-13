const doctorModel = require("../models/doctorModel");
const userModel = require("../models/useModel");

const getAllUsersController=async(req,res)=>{
    try {
        const users=await userModel.find({})
        res.status(200).send({
            success:true,
            message:'fetch all users list successfully',
            data:users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while fetching users",
            error
        })
    }
};


const getAllDoctorsController=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({})
        res.status(200).send({
            success:true,
            message:'fetch all doctors list successfully',
            data:doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while fetching doctors",
            error
        })
    }
};

const changeAccountStatusController=async(req,res)=>{
    try {
        const {doctorId,status} =req.body
        const doctor=await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user=await userModel.findOne({_id:doctor.userId})
        const notification=user.notification
        notification.push({
            type:'doctor-account-request-updated',
            message:`Your Doctor account request is ${status}`,
            onClickPath:'/notification'
        })
        user.isDoctor= status ==='approved'?true:false
        await user.save()
        res.status(200).send({
            success:true,
            message:"Account status updated successfully",
            data:doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in account status',
            error
        })
    }
}


module.exports={getAllDoctorsController,getAllUsersController,changeAccountStatusController}