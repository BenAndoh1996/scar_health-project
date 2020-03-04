const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');

const vital =require('../models/VitalSchema')
var app= express()

//Doctors login Handle
router.get('/patientvital', function(req, res){
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
    let Month = req.body.Month
    let Current_Date = req.body.Current_Date
    let Doctor_Name = req.body.Doctor_Name
    let Deparment= req.body.Deparment
    let String_Date  = new Date().toLocaleDateString().split(",")[0]
    let d = new Date()
    let Year = d.getFullYear
    let Hospital_UserName = req.user.UserName
    let Status = 'Noview'
    
   
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
           Pulse_Rate,
           Month,
           Current_Date,
           Doctor_Name,
           Deparment,
           String_Date,
           Year,
           Hospital_UserName,
           Status
        });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The Patient Vitals has been recorded and will be sent to the Consulting Doctor')  
       res.redirect('/dashboard/PatientVital');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});


//var url = 'mongodb://localhost:27017/scarhealth';
  var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority '

router.get('/DocPage', function(req, res, next){
   
    const vitalArray = []
    const DateToday = new Date().toLocaleDateString().split(",")[0]
    Mongoclient.connect(process.env.MONGODB_URI || url, {useNewUriParser: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Doctor_UserName: req.user.inputEmail, Status: 'Noview', String_Date: DateToday, Hospital_UserName: req.user.UserName };
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
             res.render('docpage',{ Vitals: vitalArray} );  
    });
    });
    

});
// handle deleting Vitals
router.post('/DeleteVitals', function(req, res){
  let Name = req.body.Name
  let PatientId= req.body.PatientId
  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
    assert.equal(null, err);
    console.log('sucessesfully connected');
    let db = client.db('scarhealth')
    let query = {Doctor_UserName: req.user.inputEmail,  Patients_Name :Name, Patient_ID: PatientId};
    
    db.collection('vitals').deleteOne(query,(function(err,docs){
       if(err){
         console.log(err)
       }else{
         console.log('deleted successfull')
       }
       console.log(Name)
       console.log(PatientId)
       res.send('The Vitals Has been Deleted ');
       
  }));
    
});
});


router.delete('/delete/:ID', function(req, res){
 let item = req.params.ID;
 console.log(item)

 Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
  assert.equal(null, err);
  console.log('sucessesfully connected');
  let Quantity = Number(req.body.Quantity_Five)
  let db = client.db('scarhealth')
  let query = {Doctor_UserName: req.user.inputEmail, Patient_ID:item };
  let UpdateObj = {
   $set: {
     Status: 'Viewed' }
 }
 db.collection('vitals').updateOne(query,UpdateObj,(function(err,data){
    if(err){
      console.log(err)
    }else{
      res.json(data)
      console.log('Updated successfully')
    }
}));

});
  
} );
module.exports = router;