const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const request=require('../models/RequestSchema')


//Medical report Form Handle
router.get('/LabRequest', function(req, res){
    res.render('labrequest') 
} );

router.post('/LabRequest', function(req, res){
    
    let Doctor_Name = req.body.Doctor_Name
    let Doctor_UserName= req.body.Doctor_UserName
    let patient_name = req.body.patient_name
    let date = req.body.date
    let Sample_ID = req.body.Sample_ID;
    let Lab_Type = req.body.Lab_Type
    let Description= req.body.Description
    let Hospital_UserName = req.body.Hospital_UserName
    let Patient_ID = req.body.Patient_ID
   
      const newUser = new request({
        Doctor_Name,
        Hospital_UserName,
        patient_name,
        Patient_ID,
           Doctor_UserName,
           date,
           Sample_ID ,
           Lab_Type,
           Description,
           
        });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The lab requested is being sent to laboratory')  
       res.redirect('/dashboard/LabRequest');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});


module.exports = router;