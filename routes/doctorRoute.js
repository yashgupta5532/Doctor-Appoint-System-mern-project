const express=require('express');
const Authmiddleware = require('../middlewares/Authmiddleware');
const {getDoctorInfoController , updateProfileController,getDoctorByIdController,doctorAppointmentController,updateStatusController} =require('../controllers/doctorController')

const router=express.Router();

// post single doctor info
router.post('/getDoctorInfo',Authmiddleware,getDoctorInfoController)

//updateDoctor profile
router.post('/updateProfile',Authmiddleware,updateProfileController)

//getsingleDoctorinfo
router.post('/getDoctorById',Authmiddleware,getDoctorByIdController)

//get Appointments
router.get('/doctor-appointments',Authmiddleware,doctorAppointmentController)

//post update status
router.post('/update-status',Authmiddleware,updateStatusController)

module.exports=router