const userModel = require("../models/useModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel=require('../models/doctorModel');
const appointmentModel = require("../models/appointmentModel");
const moment =require('moment')

const registerUser = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    console.log(existingUser);
    if (existingUser) {
      return res
        .status(500)
        .send({ success: false, message: "User already exists" });
    }

    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);
    req.body.password = hashPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    // console.log(newUser);
    res.status(200).send({
      success: true,
      message: "user register successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User doesnot exist ",
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2d",
    });
    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `error while login ${error.message}`,
    });
  }
};


//getuser data
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password=undefined
    if (!user) {
      res.status(200).send({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).send({
        success: true,
        data: user
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "auth error",
      error,
    });
  }
};

const applyDoctorController=async(req,res)=>{
  try {
    const newDoctor=await doctorModel({...req.body,status:'Pending'})
    await newDoctor.save()
    const adminUser =await userModel.findOne({isAdmin:true})
    const notification=adminUser.notification
    notification.push({
      type:'apply-doctor-request',
      message:`${newDoctor.firstName}  ${newDoctor.lastName}  Has Applied for Doctor Account`,
      data:{
        doctorId:newDoctor._id,
        name:newDoctor.firstName + " "+newDoctor.lastName,
        onClickPath:'/admin/doctors'
      },
    })
    await userModel.findByIdAndUpdate(adminUser._id,{notification})
    res.status(200).send({
      success:true,
      message:"Doctor Account Applied successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error while applying for Doctor",
      error
    })
  }
}


const getAllNotificationController =async(req,res)=>{
  try {
    const user=await userModel.findById({_id:req.body.userId})
    const seenNotification=user.seenNotification
    const notification=user.notification
    seenNotification.push(...notification)
    user.notification=[];
    user.seenNotification=notification
    const updatedUser=await user.save()
    res.status(200).send({
      success:true,
      message:'all notification marked as read',
      data:updatedUser
    })
  } catch (error) {
    console.log(error)
    res.status({
      success:false,
      message:'Error in notification',
      error
    })
  }
}

//delete all notification
const deleteAllNotificationController=async (req,res)=>{
  try {
    const user=await userModel.findOne({_id:req.body.userId})
    user.notification=[];
    user.seenNotification=[];
    const updatedUser=await user.save();
    updatedUser.password=undefined
    res.status(200).send({
      success:true,
      message:"message deleted successfully",
      data:updatedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Unable to delete all notification',
      error
    })
  }
}


//getAllDoctors
const getAllDoctorsController=async(req,res)=>{
  try {
    const doctors=await doctorModel.find({status:'approved'})
    res.status(200).send({
      success:true,
      message:"All doctors fetched successfully",
      data:doctors
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error while fetching all doctors',
      error
    })
  }
}

//book appointment
const bookAppointmentController= async(req,res)=>{
  try {
    req.body.date=moment(req.body.date,'DD-MM_YYYY').toISOString()
    req.body.time=moment(req.body.time,'HH:mm').toISOString()
    req.body.status="pending"
    const newAppointment=new appointmentModel(req.body)
    await newAppointment.save()
    const user=await userModel.findOne({_id:req.body.doctorInfo.userId})
    user.notification.push({
      type:'New Appointment Request',
      message:`A new Appointment Request from ${req.body.userInfo.name}`,
      onClickPath:'/user/appointments'
    })
    await user.save()
    res.status(200).send({
      success:true,
      message:'Appointment Booked successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error while Booking Appointment",
      error
    })
  }
}

//checking book Availability
const bookAvailabilityController=async(req,res)=>{
  try {
    const date=moment(req.body.date,"DD-MM-YYYY").toISOString();
    const fromTime=moment(req.body.time,"HH:mm").subtract(1,'hours').toISOString()
    const toTime=moment(req.body.time,'HH:mm').add(1,'hours').toISOString()
    const doctorId=req.body.doctorId
    const appointments=await appointmentModel.find({doctorId,
    date,
    time:{
      $gte:fromTime,$lte:toTime
    }
    })
    if(appointments.length >0){
      return res.status(200).send({
        message:'Appointments not available at this time',
        success:true
      })
    }
    else{
      return res.status(200).send({
        success:true,
        message:'Appointments Available'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error while checking book availability",
      error
    })
  }
}


//Appointments starts here

//Appointment lists
const userAppointmentsController =async (req,res)=>{
  try {
    const appointments =await appointmentModel.find({userId:req.body.userId})
    res.status(200).send({
      success:true,
      message:"Users Appointments fetched Successfully",
      data:appointments,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error while fetching Users Appointments ",
      error
    })
  }
}




module.exports = { loginUser, registerUser, authController,applyDoctorController,getAllNotificationController ,deleteAllNotificationController,getAllDoctorsController,bookAppointmentController,bookAvailabilityController,userAppointmentsController};
