const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const billing = require('../models/BillSchema')

router.get('/OPDBills:INFOSTRING', function(req, res){
  const Total = []
  let Info = req.params.INFOSTRING
  let InFoJSON = JSON.parse(Info)
  Total.push(InFoJSON)
   console.log(Total)
  res.render('opdbills',{Total:Total,Department:req.user.Department}) 
} );

//Doctors billing handle
router.get('/DocBilling:Infostring', function(req, res){
  const Total = []
  let Info = req.params.Infostring
  let InFoJSON = JSON.parse(Info)
  Total.push(InFoJSON)
   console.log(Total)
  res.render('docbillings',{Total:Total,Department:req.user.Department}) 
} );

router.get('/Billing', function(req, res){
    res.render('billings') 
} );



//register handle
router.post('/Billing', function(req, res){
    
    let Patients_Name= req.body.Patients_Name
    let Patient_ID = (req.body.Patient_ID).replace(/\s/g,'')
    let Hospital_UserName = (req.user.UserName).replace(/\s/g,'')
    let Doctor_Name= req.user.Name
    let Month = req.body.Month ;
    let Current_Date = req.body.Current_Date
    let Department= req.body.Department
    let Billing_One= Number(req.body.Billing_One)
    let Purpose_One= req.body.Purpose_One
    let Billing_Two= Number(req.body.Billing_Two)
    let Purpose_Two= req.body.Purpose_Two
    let String_Date = new Date().toLocaleDateString().split(",")[0]
    let Total = Number(Billing_One)+ Number(Billing_Two)
     let Status = 'No'
    
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
           Total,
           Status
        });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The new bills have been added succesfully and has be sent to Accont Department')  
        data = req.body
       res.json(data);
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                       
});

module.exports = router;