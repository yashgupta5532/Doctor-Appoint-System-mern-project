const mongoose=require('mongoose')

const express=require('express');
const { loginUser, registerUser,authController,applyDoctorController,getAllNotificationController ,deleteAllNotificationController,getAllDoctorsController ,bookAppointmentController,bookAvailabilityController,userAppointmentsController} = require('../controllers/userController');

const Authmiddleware = require('../middlewares/Authmiddleware');

const router=express.Router();

router.post('/login',loginUser);

router.post('/register',registerUser);

router.post('/getUserData',Authmiddleware,authController)

//Apply Doctor 
router.post('/apply-doctor',Authmiddleware,applyDoctorController)

//get all notification 
router.post('/get-all-notification',Authmiddleware,getAllNotificationController)

//delete all notification 
router.post('/delete-all-notification',Authmiddleware,deleteAllNotificationController)

//getAll doctors
router.get('/getAllDoctors',Authmiddleware,getAllDoctorsController)


// Book appointment
router.post('/book-appointment',Authmiddleware,bookAppointmentController)

//book Availability checking
router.post('/booking-availability',Authmiddleware,bookAvailabilityController)


//Appointment Lists
router.get('/user-appointments',Authmiddleware,userAppointmentsController)

module.exports=router