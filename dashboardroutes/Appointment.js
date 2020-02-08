const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');

const appoints=require('../models/AppointSchema')


//Doctors Appointment form handle
router.get('/Appointment', function(req, res){
    res.render('appointments') 
} );


router.post('/Appointment', function(req, res){
    
    let Doctor_UserName= req.body.Doctor_UserName
    let patient_name= req.body.patient_name
    let patient_ID= req.body.patient_ID
    let date = req.body.date
    let Appointment_Date = req.body.Appointment_Date
    let Purpose = req.body.Purpose
    let Contact = req.body.Contact
    
      
   
      const newUser = new appoints({
        Doctor_UserName,
        patient_name,
        patient_ID,
        Contact,
        Appointment_Date,
           Purpose,
           date
           
        });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The new appoint has been saved successfully')  
       res.redirect('/dashboard/Appointment');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});


var url = 'mongodb://localhost:27017/scarhealth';

router.get('/AppointList', function(req, res, next){
   
    const AppointArray = []

    Mongoclient.connect(url, {useNewUriParser: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Doctor_UserName: req.user.inputEmail};
        db.collection('appoints').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.inputEmail = doc.Doctor_UserName){
                    AppointArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(AppointArray);
             console.log(AppointArray.length)
               res.render('appointlist', { Appoint: AppointArray});
    });
    });
    

});
module.exports = router;