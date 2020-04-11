const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');

const appoints=require('../models/AppointSchema')


//Doctors Appointment form handle
router.get('/Appointment:Infostring', function(req, res){
  const Info = []
  let data = req.params.Infostring
  let dataObject = JSON.parse(data)
  Info.push(dataObject)
  console.log(Info)
    res.render('appointments', {Info:Info, userName:req.user.inputEmail}) 
} );


router.post('/Appointment', function(req, res){
    
    let Doctor_UserName= (req.body.Doctor_UserName).replace(/\s/g,'')
    let patient_name= req.body.patient_name
    let patient_ID= (req.body.patient_ID).replace(/\s/,'')
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
        data = req.body
       res.json(data)
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});


 var url = 'mongodb://localhost:27017/scarhealth';
//var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority '

router.get('/AppointList', function(req, res, next){
   
    const AppointArray = []

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
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

//Doctors Appointment form delete
router.delete('/Appointdelete/:ID', function(req, res){
  var ObjectId = require('mongodb').ObjectId
  let itemstring = (req.params.ID).replace(/\s/g,'');
  let item = new ObjectId(itemstring)
  console.log(item)
 
  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
   assert.equal(null, err);
   console.log('sucessesfully connected');
   let db = client.db('scarhealth')
   let query = {Doctor_UserName: req.user.inputEmail, patient_ID:item };
   
  db.collection('appoints').deleteOne(query,(function(err,data){
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