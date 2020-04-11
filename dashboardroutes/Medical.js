const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Mongoclient = require('mongodb');
const assert = require('assert');


var url = 'mongodb://localhost:27017/scarhealth';
//var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority'


const medical=require('../models/MedSchema')
const medicaltwo=require('../models/MedTwoSchema')


//Medical report Form Handle
router.get('/MedicalForm:Infostring', function(req, res){
  const Total = []
    let Info = req.params.Infostring
    let Infodata = JSON.parse(Info)
    Total.push(Infodata)
    console.log(Total)
    res.render('medform',{Total:Total, Doctor:req.user.Name}) 
} );

//Accessing Medical Report Handle
router.get('/MedicalReport', function(req, res){

   res.render('medreport',
   {
    Hospital: req.user.Hospital, Name: req.user.Name},) 
} );

router.get('/MEDFORMTWO', function(req, res){

  res.render('medformtwo',) 
} );
//register handle
router.post('/MedicalForm', function(req, res){
    
    let Full_Name= req.body.Full_Name
    let Patient_ID= (req.body.Patient_ID).replace(/\s/g,'')
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
        
             console.log(req.body);
               })
          .catch(err => console.log(err));
            Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
            assert.equal(null, err);
            console.log('sucessesfully connected');
            var ObjectId = require('mongodb').ObjectId
            let itemstring = req.body.PatientId
            let item = new ObjectId(itemstring)
            console.log(item)
            let db = client.db('scarhealth')
            let query = { _id:item };
            
            db.collection('medicaltwos').deleteOne(query,(function(err,data){
              if(err){
                console.log(err)
              }else{
                res.json(data)
                console.log('deleted successfully successfully')
              }
          }));
    
 });
});


router.post('/MedicalFormTwo', function(req, res){
    
  let Full_Name= req.body.Full_Name
  let Patient_ID= (req.body.Patient_ID).replace(/\s/g,'')
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
 let Doctor_UserName = req.user.inputEmail
  let String_Date = new Date().toLocaleDateString().split(",")[0]

  
 
    const newUser = new medicaltwo({
      Full_Name,
      Patient_ID,
      Hospital,
      Doctor_Name,
      Doctor_UserName,
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
        req.flash('success_msg', 'You Have Successfully Added To the Patient Medical History Temporarally And changes can made to it')  
        let data = req.body;
        res.json(data)
           console.log(req.body);
             })
        .catch(err => console.log(err));  
});
   
router.get('/MedicalUpdate', function(req, res, next){
   const MedReport = []
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Doctor_UserName: req.user.inputEmail };
        db.collection('medicaltwos').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (Search = doc.Patient_ID){
                    MedReport.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(MedReport);
             console.log(MedReport.length)
               res.render('medupdate', { MedReport: MedReport});
    });
    });
    

});

router.get('/PatientMedUpdate:reportID', function(req, res, next){
 
  var MedReport 
  var ObjectId = require('mongodb').ObjectId
  var Search = req.params.reportID
  let searchId = new ObjectId(Search)
 console.log(searchId)
  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      var db = client.db('scarhealth');
      var query = {_id: searchId };
      db.collection('medicaltwos').find(query).toArray(function(err,docs){
          docs.forEach(function(doc){
              if (searchId = doc._id){
                MedReport = doc     
           }              
             },function(){
              client.close
             })
             console.log(MedReport);
             res.render('medformthree', { Hospital: req.user.Hospital, MedReport:JSON.stringify(MedReport) });
  });
  });
  

});

  router.post('/UpdateMedForm', function(req,res){
    let Full_Name= req.body.Full_Name
    let Patient_ID= (req.body.Patient_ID).replace(/\s/g,'')
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
   let Doctor_UserName = req.user.inputEmail
    let String_Date = new Date().toLocaleDateString().split(",")[0]
   
    var ObjectId = require('mongodb').ObjectId
    let patientId = req.body.PatientId
    console.log(patientId)
    let searchId = new ObjectId(patientId)
     
    console.log(searchId)
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true,useNewUrlParser: true}, function(err, client){
    assert.equal(null, err);
    console.log('sucessesfully connected');
    let db = client.db('scarhealth')
    let query = { _id : searchId};
    let UpdateObj = {
      $set: {
        Full_Name:Full_Name, Patient_ID:Patient_ID, Birth_Date:Birth_Date, Address:Address,Telephone:Telephone, Reffered:Reffered, Site:Site, Onset:Onset,Time_Course:Time_Course, Severity:Severity,Charater:Charater, Radiations:Radiations, Associations:Associations, Relieving:Relieving, Family:Family, Prior:Prior, Present:Present, Medication:Medication, Sedentary:Sedentary, Habits:Habits, OE:OE, Work:Work, CVS:CVS, Chest:Chest, Abdominal:Abdominal, CNS:CNS, GI:GI, Review:Review, Summary:Summary, Diagnosis:Diagnosis, Treatment:Treatment, any:any, Lab_ID:Lab_ID,Lab_type:Lab_type, Description:Description, surgical:surgical, Drugs:Drugs,Remarks:Remarks }
    }
    db.collection('medicaltwos').updateOne(query,UpdateObj,(function(err,data){
      if(err){
        console.log(err)
      }else{
        req.flash('success_msg', 'You Have Successfully Added To the Patient Medical History') 
        res.json(data)
        console.log('Updated successfully')
      }
  }));
  
  });
    
     
  })
module.exports = router;