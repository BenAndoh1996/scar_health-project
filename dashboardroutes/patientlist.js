const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');


//var url = 'mongodb://localhost:27017/scarhealth';
var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/test?retryWrites=true&w=majority '
router.get('/PatientList', function(req, res, next){
   
    var UserName = req.user.UserName
    const PatientArray = []

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {ScarHealth_UserName: req.user.UserName};
        db.collection('addpatientschemas').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.ScarHealth_UserName){
                    PatientArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(PatientArray);
             console.log(PatientArray.length)
               res.render('patientlist', { Patients: PatientArray});
    });
    });
    

});

// Handle for Medical report Generation

router.post('/MedicalReport', function(req, res, next){
   
    var Search = req.body.Search
    const MedReport = []

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Patient_ID: Search };
        db.collection('medicals').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (Search= doc.Patient_ID){
                    MedReport.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(MedReport);
             console.log(MedReport.length)
               res.render('medresult', { Hospital: req.user.Hospital, Name: req.user.Name , MedReport: MedReport});
    });
    });
    

});


//handle for lab search in the doctors department
router.post('/LabRecord', function(req, res, next){
   
    var Patient_ID = req.body.Patient_ID
    const LabRecord = []

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Patient_ID: Patient_ID };
        db.collection('labresults').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (Patient_ID = doc.Patient_ID){
                    LabRecord.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(LabRecord);
             console.log(LabRecord.length)
               res.render('patientlablist', { Hospital: req.user.Hospital, Name: req.user.Name , LabRecord: LabRecord});
    });
    });
    

});


//handle for lab search in the doctors department
router.get('/DocLabList', function(req, res, next){
   
    const DocLabArray = []

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Doctor_UserName: req.user.inputEmail };
        db.collection('labresults').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.inputEmail = doc.Doctor_UserName){
                    DocLabArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(DocLabArray);
             console.log(DocLabArray.length)
               res.render('doclablist', { Hospital: req.user.Hospital, Name: req.user.Name , DocLabArray: DocLabArray});
    });
    });
    

});


module.exports = router;