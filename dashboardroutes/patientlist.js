const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');


//var url = 'mongodb://localhost:27017/scarhealth';
var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority'

router.get('/patientlist', function(req, res){
    const PatientArray = []
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName};
        db.collection('addpatientschemas').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    PatientArray.push(doc);      
             }              
               },function(){
                client.close
               })
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
                if (Search = doc.Patient_ID){
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
               res.render('patientlablist', { Hospital: req.user.Hospital, Id: req.body.Patient_ID, LabRecord: LabRecord});
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
        var query = {Doctor_UserName: req.user.inputEmail, Status : 'NoView' };
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

        //route for  deleting lab view at doctor side
        router.delete('/DocLabdelete/:ID', function(req, res){
          var ObjectId = require('mongodb').ObjectId
          let item = req.params.ID
          let searchId = new ObjectId(item)
        console.log(searchId)
          Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
          assert.equal(null, err);
          console.log('sucessesfully connected');
          let db = client.db('scarhealth')
          let query = {Doctor_UserName: req.user.inputEmail, _id : searchId};
          let UpdateObj = {
            $set: {
              Status: 'Viewed' }
          }
          db.collection('labresults').updateOne(query,UpdateObj,(function(err,data){
            if(err){
              console.log(err)
            }else{
              res.json(data)
              console.log('Updated successfully')
            }
        }));
        
        });
          
        } );
        
      
               //route for  deleting lab view at doctor side
               router.get('/MedResult/:ID', function(req, res){
                 var Data = []
                var ObjectId = require('mongodb').ObjectId
                let item = req.params.ID
                let searchId = new ObjectId(item)
              console.log(searchId)
                Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
                assert.equal(null, err);
                console.log('sucessesfully connected');
                let db = client.db('scarhealth')
                let query = { _id : searchId};
      
                db.collection('medicals').find(query,(function(err,docs){
                  docs.forEach(function(doc){
                    if (_id = searchId){
                        Data.push(doc);      
                 }              
                   },function(){
                    client.close
                   })
                   console.log(Data)
                   res.render('medicals', { Hospital: req.user.Hospital, Name: req.user.Name , Data: Data})
              }));
             
              });
                
              } );


              router.post('/PatientReport', function(req, res, next){
                const MedReport = []
                var ObjectId = require('mongodb').ObjectId
                var Search = req.body.Search
                let searchId = new ObjectId(Search)
               console.log(searchId)
                Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
                    assert.equal(null, err);
                    console.log('sucessesfully connected');
                    var db = client.db('scarhealth');
                    var query = {_id: searchId };
                    db.collection('medicals').find(query).toArray(function(err,docs){
                        docs.forEach(function(doc){
                            if (searchId = doc._id){
                                MedReport.push(doc);      
                         }              
                           },function(){
                            client.close
                           })
                           console.log(MedReport);
                         console.log(MedReport.length)
                           res.render('medicals', { Hospital: req.user.Hospital, Name: req.user.Name , MedReport: MedReport});
                });
                });
                
            
            });

module.exports = router;