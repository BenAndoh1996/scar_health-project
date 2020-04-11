const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Mongoclient = require('mongodb');
const assert = require('assert');



const request=require('../models/RequestSchema')


//Medical report Form Handle
router.get('/LabRequest:Infostring', function(req, res){
  const Total = []
    let Info = req.params.Infostring
    let Infodata = JSON.parse(Info)
    Total.push(Infodata)
    console.log(Total)
  res.render('labrequest',{Total:Total, Doctor:req.user.Name, UserName:req.user.inputEmail, Hospital:req.user.Hospital}) 
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
    let Patient_ID = (req.body.Patient_ID).replace(/\s/g,'')
    let Status = 'In Progress'
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
           Status,
           Description,
           String_Date,
           
        });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The lab requested is being sent to laboratory')  
        let data = req.body 
        res.json(data)
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});
 var url = 'mongodb://localhost:27017/scarhealth';
 //var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/test?retryWrites=true&w=majority '
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


 // Doctor request list
 router.get('/DocRequestList', function(req, res, next){
  const ViewArray = []

  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      var db = client.db('scarhealth');
      var query = {Hospital_UserName: req.user.UserName, Doctor_UserName:req.user.inputEmail };
      db.collection('requests').find(query).toArray(function(err,docs){
          docs.forEach(function(doc){
              if (req.user.inputEmail = doc.Doctor_UserName){
                  ViewArray.push(doc);      
           }              
             },function(){
              client.close
             })
             console.log(ViewArray);
           console.log(ViewArray.length)
             res.render('docrequest', { ViewArray: ViewArray});
   });
});

} );



module.exports = router;