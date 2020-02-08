const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const billing = require('../models/BillSchema')


//Doctors billing handle
router.get('/Billing', function(req, res){
    res.render('billings') 
} );



//register handle
router.post('/Billing', function(req, res){
    
    let Patients_Name= req.body.Patients_Name
    let Patient_ID = req.body.Patient_ID
    let Hospital_UserName = req.user.UserName
    let Doctor_Name= req.user.Name
    let Month = req.body.Month ;
    let Current_Date = req.body.Current_Date
    let Department= req.body.Department
    let Billing_One= req.body.Billing_One
    let Purpose_One= req.body.Purpose_One
    let Billing_Two= req.body.Billing_Two
    let Purpose_Two= req.body.Purpose_Two
    let Billing_Three = req.body.Billing_Three
    let Purpose_Three = req.body.Purpose_Three
    let String_Date = new Date().toLocaleDateString().split(",")[0]
    let Total = Number(Billing_One)+ Number(Billing_Two) + Number(Billing_Three)
    let Status  = "No"

      const newUser = new billing({
          Patients_Name,
           Patient_ID,
           Hospital_UserName,
           Doctor_Name,
           Month ,
           Current_Date,
           String_Date,
           Department,
           Billing_One,
           Purpose_One,
           Billing_Two,
           Purpose_Two,
           Billing_Three,
           Purpose_Three,
           Total,
           Status
        });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The new bills have been added succesfully and has be sent to Accont Department')  
       res.redirect('/dashboard/Billing');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});

module.exports = router;