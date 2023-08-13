const express=require('express')
const Authmiddleware = require('../middlewares/Authmiddleware')
const { getAllUsersController, getAllDoctorsController,changeAccountStatusController } = require('../controllers/adminController')

const router=express.Router()

//get all users
router.get('/getAllUsers',Authmiddleware,getAllUsersController)

//get all doctors
router.get('/getAllDoctors',Authmiddleware,getAllDoctorsController)

//change account
router.post('/changeAccountStatus',Authmiddleware,changeAccountStatusController)



module.exports=router