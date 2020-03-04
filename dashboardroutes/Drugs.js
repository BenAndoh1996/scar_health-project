const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');

const drug=require('../models/DrugSchema')


//Drug Prescription Handle report Form Handle
router.get('/GetDrugs', function(req, res){
    res.render('medform') 
} );

router.get('/Prescriptions', function(req, res){
  res.render('prescription') 
} );


//
router.post('/GetDrugs', function(req, res){
    
    let Patients_Name= req.body.Patients_Name
    let Patient_ID = req.body.Patient_ID
    let Hospital_UserName = req.user.UserName
    let Doctor_Name = req.user.Name
    let Current_Date= req.body.Current_Date;
    let Drug_One = req.body.Drug_One
    let Dosage_One= req.body.Dosage_One
    let Drug_Two= req.body.Drug_Two
    let Dosage_Two= req.body.Dosage_Two
     let Drug_Three= req.body.Drug_Three
    let Dosage_Three = req.body.Dosage_Three
   let Drug_Four= req.body.Drug_Four
    let Dosage_Four= req.body.Dosage_Four
   let  Drug_Five= req.body. Drug_Five
   let  Dosage_Five= req.body.Dosage_Five
    let Drug_Six= req.body.Drug_Six
    let Dosage_Six= req.body.Dosage_Six
   let  Drug_Seven= req.body.Drug_Seven
    let Dosage_Seven= req.body.Dosage_Seven
    let Drug_Eight= req.body.Drug_Eight
    let Dosage_Eight= req.body.Dosage_Eight
    let Drug_Nine= req.body.Drug_Nine
    let Dosage_Nine= req.body.Dosage_Nine
    let Dosage_Ten= req.body.Dosage_Ten
    let Drug_Ten= req.body.Drug_Ten
    let String_Date = new Date().toLocaleDateString().split(",")[0]
  
      const newUser = new drug({
          Patients_Name,
           Patient_ID,
           Hospital_UserName,
           Doctor_Name,
           Current_Date,
           String_Date,
           Drug_One,
           Dosage_One,
           Drug_Two,
           Dosage_Two,
           Drug_Three,
           Dosage_Three,
           Drug_Four,
           Dosage_Four,
           Drug_Five,
           Dosage_Five,
           Drug_Six,
           Dosage_Six,
           Drug_Seven,
           Dosage_Seven,
           Drug_Eight,
           Dosage_Eight,
           Drug_Nine,
           Dosage_Nine,
           Drug_Ten,
           Dosage_Ten
        });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The drug prescription has been sent to the pharmaccy')  
       res.redirect('/dashboard/GetDrugs');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});

//handle for viewingprescribed  drugs at the pharmacy
//var url = 'mongodb://localhost:27017/scarhealth';
var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority '

router.get('/Pharmpage', function(req, res, next){
   if(req.user.Department === 'Pharmacist'){
        
    var dateToday = new Date().toLocaleDateString().split(",")[0]
    const DrugArray = []
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName, String_Date:dateToday};
        db.collection('drugs').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    DrugArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(DrugArray);
             console.log(DrugArray.length)
               res.render('pharmpage', { Drug: DrugArray});
    });
    });

   }else{
    req.flash('success_msg', 'Based on your role Assigned by Administrator, You cannot access this page. This page can only be access by Pharmacist. Please Contact your Admin')  
    res.redirect('/dashboard');
   }

    

});

router.delete('/Pharmdelete/:ID', function(req, res){
  var ObjectId = require('mongodb').ObjectId
          let item = req.params.ID
          let searchId = new ObjectId(item)
        console.log(searchId)
 
  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
   assert.equal(null, err);
   console.log('sucessesfully connected');
   let db = client.db('scarhealth')
   let query = {Hospital_UserName: req.user.UserName, _id:searchId};
   
  db.collection('drugs').deleteOne(query,(function(err,data){
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