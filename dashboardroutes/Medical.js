const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const medical=require('../models/MedSchema')


//Medical report Form Handle
router.get('/MedicalForm', function(req, res){
    res.render('medform') 
} );

//Accessing Medical Report Handle
router.get('/MedicalReport', function(req, res){
   res.render('medreport',
   {
    Hospital: req.user.Hospital, Name: req.user.Name},) 
} );


//register handle
router.post('/MedicalForm', function(req, res){
    
    let Patients_Name= req.body.Patients_Name
    let Patient_ID= req.body.Patient_ID
    let Hospital= req.body.Hospital
    let Doctor_Name = req.body.Doctor_Name
    let Patient_Complaints = req.body.Patient_Complaints;
    let Patient_History= req.body.Patient_History
    let Diagnosis= req.body.Diagnosis
    let Treament = req.body.Treament
    let Adittional_Info = req.body.Adittional_Info
    let date = req.body.date
   
    const newUser = new medical({
        Patients_Name,
        Patient_ID,
        Hospital,
        Doctor_Name,
        Patient_Complaints,
        Patient_History,
        Diagnosis,
        Treament,
        Adittional_Info,
        date
     });

    //saving a new user to database
          newUser.save()
         .then(function(){
          req.flash('success_msg', 'You Have Successfully Added To the Patient Medical History')  
             res.redirect('/dashboard/MedicalForm');
             console.log(req.body);
               })
          .catch(err => console.log(err));  
 

 
 

});
module.exports = router;