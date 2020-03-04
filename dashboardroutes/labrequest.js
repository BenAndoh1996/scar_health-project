const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Mongoclient = require('mongodb');
const assert = require('assert');



const request=require('../models/RequestSchema')


//Medical report Form Handle
router.get('/LabRequest', function(req, res){
    res.render('labrequest') 
} );

router.post('/LabRequest', function(req, res){
    
    let Doctor_Name = req.user.Name
    let Doctor_UserName= req.user.inputEmail
    let patient_name = req.body.patient_name
    let date = req.body.date
    let Sample_ID = req.body.Sample_ID;
    let Lab_Type = req.body.Lab_Type
    let Description= req.body.Description
    let Hospital_UserName = req.user.UserName
    let Patient_ID = req.body.Patient_ID
    let String_Date = new Date().toLocaleDateString().split(",")[0]
   
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
           String_Date,
           
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
//var url = 'mongodb://localhost:27017/scarhealth';
 var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/test?retryWrites=true&w=majority '
//Doctors Appointment form delete
router.delete('/Labdelete/:ID', function(req, res){
  var ObjectId = require('mongodb').ObjectId
          let item = req.params.ID
          let searchId = new ObjectId(item)
        console.log(searchId)
 
  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
   assert.equal(null, err);
   console.log('sucessesfully connected');
   let db = client.db('scarhealth')
   let query = {Hospital_UserName: req.user.UserName, _id:searchId};
   
  db.collection('requests').deleteOne(query,(function(err,data){
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