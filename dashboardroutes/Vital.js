const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');

const vital =require('../models/VitalSchema')


//Doctors login Handle
router.get('/PatientVital', function(req, res){
    res.render('patientvital') 
} );


//register handle
router.post('/PatientVital', function(req, res){
    
    let Patients_Name= req.body.Patients_Name
    let Patient_ID = req.body.Patient_ID
    let Temperature = req.body.Temperature
    let date = req.body.date
    let Blood_Level = req.body.Blood_Level;
    let Body_Weight = req.body.Body_Weight
    let Sugar_Level= req.body.Sugar_Level
    let Doctor_UserName= req.body.Doctor_UserName
    let Height= req.body.Height
     let Age= req.body.Age
    let Pulse_Rate = req.body.Pulse_Rate
    
   
      const newUser = new vital({
          Patients_Name,
           Patient_ID,
           Temperature,
           date,
           Blood_Level,
           Body_Weight,
           Sugar_Level,
           Doctor_UserName,
           Height,
           Age,
           Pulse_Rate
        });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The new doctor has been registered and can log in')  
       res.redirect('/dashboard/PatientVital');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});


var url = 'mongodb://localhost:27017/scarhealth';

router.get('/DocPage', function(req, res, next){
   
    const vitalArray = []

    Mongoclient.connect(url, {useNewUriParser: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Doctor_UserName: req.user.inputEmail};
        db.collection('vitals').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.inputEmail = doc.Doctor_UserName){
                    vitalArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(vitalArray);
             console.log(vitalArray.length)
               res.render('docpage', { Vitals: vitalArray});
    });
    });
    

});


module.exports = router;