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
    
    let Full_Name= req.body.Full_Name
    let Patient_ID= req.body.Patient_ID
    let Hospital= req.user.Hospital
    let Doctor_Name = req.user.Name
    let Birth_Date = req.body.Birth_Date;
    let Address= req.body.Address
    let Telephone= req.body.Telephone
    let Reffered = req.body.Reffered
    let Site = req.body.Site
    let Onset = req.body.Onset
    let Time_Course = req.body.Time_Course;
    let Severity = req.body.Severity
    let Charater = req.body.Charater
    let Radiations = req.body.Radiations
    let Associations = req.body.Associations
    let Relieving = req.body.Relieving
    let Family = req.body.Family
    let Prior = req.body.Prior;
    let Present = req.body.Present
    let Medication = req.body.Medication
    let Sedentary = req.body.Sedentary
    let Work = req.body.Work
    let Habits = req.body.Habits
    let OE = req.body.OE
    let CVS = req.body.CVS
    let Chest = req.body.Chest;
    let Abdominal = req.body.Abdominal
    let CNS = req.body.CNS
    let GI = req.body.GI
    let Review = req.body.Review
    let Summary = req.body.Summary
    let Diagnosis = req.body.Diagnosis
    let Treatment = req.body.Treatment
    let any = req.body.any
    let Lab_type = req.body.Lab_type
    let Lab_ID = req.body.Lab_ID
    let Description = req.body.Description;
    let surgical = req.body.surgical
    let Drugs= req.body.Drugs
    let Remarks = req.body.Remarks
 
    let String_Date = new Date().toLocaleDateString().split(",")[0]
   
      const newUser = new medical({
        Full_Name,
        Patient_ID,
        Hospital,
        Doctor_Name,
        Birth_Date,
        Address,
        Telephone,
        Reffered,
        Site,       
        Onset,
        Time_Course,
        Severity,
        Charater ,
        Radiations,
        Associations,
        Relieving,
        Family,
        Prior ,
        Present,
        Medication,
        Sedentary,
        Work,
        Habits,
        OE,
        CVS,
        Chest,
        Abdominal,
        CNS,
        GI,
        Review,
        Summary,
        Diagnosis,
        Treatment,
        any,
        Lab_type,
        Lab_ID,
        Description,
        surgical,
        Drugs,
        Remarks,
        String_Date
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