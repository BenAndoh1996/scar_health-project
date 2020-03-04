const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');


//var url = 'mongodb://localhost:27017/scarhealth';
var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority '


//Medical report Form Handle
router.get('/IPDMAIN', function(req, res){
    res.render('ipdmain') 
} );

router.get('/IPDAdmit', function(req, res){
  res.render('admit') 
} );

router.get('/IPDDischarge', function(req, res){
  res.render('discharge') 
} );


router.get('/IPDSearch', function(req, res){
  res.render('admitsearch') 
} );

router.get('/IPDForm', function(req, res){
  res.render('casestudy') 
} );

//Handle For Bed systems
router.get('/AddBedForm', function(req, res){
  res.render('addbed') 
} );


router.post('/IPDAdmit', function(req, res){

  const admit=require('../models/AdmitSchema')
    
    let Hospital_UserName = req.user.UserName
    let Current_Date= req.body.Current_Date
    let Patient_Name = req.body.Patient_Name
    let Patient_ID= req.body.Patient_ID
    let Doctor_Name= req.body.Doctor_Name;
    let Deparment = req.body.Deparment
    let Ward= req.body.Ward
    let Bed= req.body.Bed
    let Reason= req.body.Reason
    let Month= req.body.Month
    let d = new Date()
    let Year = d.getFullYear
    let String_Date= new Date().toLocaleDateString().split(",")[0]
    
      const newUser = new admit({
        Hospital_UserName,
        Current_Date,
        Patient_Name,
        Patient_ID,
        Doctor_Name ,
        Deparment,
        Ward,
        Bed,
        Reason,
        Month,
        String_Date,
        Year
        });

        // handle for updating bedstatus
        Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
          assert.equal(null, err);
          console.log('sucessesfully connected');
          let db = client.db('scarhealth')
          let query = {Hospital_UserName: req.user.UserName, Bed_Number:req.body.Bed, Ward:req.body.Ward};
          let UpdateObj = {
            $set: {
              Bed_Status: 'Occupied' }
          }
          db.collection('beds').updateOne(query,UpdateObj,(function(err,docs){
             if(err){
               console.log(err)
             }else{
               console.log('Updated successfully')
             }
        }));
        
     });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The Patient Has Been Admmited Sucessfully')  
       res.redirect('/dashboard/IPDAdmit');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});

//case taking performance form handle
router.post('/IPDForm', function(req, res){

  const cases=require('../models/CaseSchema')
    
  let Patients_Name= req.body.Patients_Name
  let Patient_ID = req.body.Patient_ID
  let Temperature = req.body.Temperature
  let date = req.body.date
  let Blood_Level = req.body.Blood_Level;
  let Current_State = req.body.Current_State
  let Sugar_Level= req.body.Sugar_Level
  let Observations= req.body.Observations
  let Adittional_Info= req.body.Adittional_Info
  let Pulse_Rate = req.body.Pulse_Rate
    
    
   
      const newUser = new cases({
        Patients_Name,
           Patient_ID,
           Temperature,
           date,
           Blood_Level,
           Current_State,
           Sugar_Level,
           Observations,
           Adittional_Info,
           Pulse_Rate
      })
     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The Update has been saved Successfuly')  
       res.redirect('/dashboard/IPDCase');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});



router.post('/IPDDischarge', function(req, res){2

  const discharge=require('../models/DischargeSchema')
    
    let Hospital_UserName = req.user.UserName
    let Date_Discharge= req.body.Date_Discharge
    let Patients_Name = req.body.Patients_Name
    let Patient_ID= req.body.Patient_ID
    let Doctor_Name= req.body.Doctor_Name;
    let Deparment = req.body.Deparment
    let Ward= req.body.Ward
    let Bed= req.body.Bed
    let Duration= req.body.Duration
    let Billings= req.body.Billings
    let Month = req.body.Month
    let String_Date = new Date().toLocaleDateString().split(",")[0]
    
    
   
      const newUser = new discharge({
        Hospital_UserName,
        Patients_Name,
        Date_Discharge,
        Patient_ID,
        Doctor_Name ,
        Deparment,
        Ward,
        Bed,
        Duration,
        Billings,
        String_Date,
        Month

        });

          // handle for updating bedstatus
          Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
            assert.equal(null, err);
            console.log('sucessesfully connected');
            let db = client.db('scarhealth')
            let query = {Hospital_UserName: req.user.UserName, Bed_Number:req.body.Bed, Ward:req.body.Ward};
            let UpdateObj = {
              $set: {
                Bed_Status: 'Empty' }
            }
            db.collection('beds').updateOne(query,UpdateObj,(function(err,docs){
               if(err){
                 console.log(err)
               }else{
                 console.log('Updated successfully')
               }
          }));
          
       });

        // handle for deleting admit patient
        Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
          assert.equal(null, err);
          console.log('sucessesfully connected');
          let db = client.db('scarhealth')
          let query = {Hospital_UserName: req.user.UserName, Patient_ID:req.body.Patient_ID, Patient_Name:req.body.Patients_Name};
          
          db.collection('admits').deleteOne(query,(function(err,docs){
             if(err){
               console.log(err)
             }else{
               console.log('Updated successfully')
             }
        }));
        
     });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The Patient Has Been Discharged Sucessfully')  
       res.redirect('/dashboard/IPDDischarge');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});

// Handle for Adding new bed 
router.post('/BedPost', function(req, res){2

  const beds=require('../models/BedSchema')
    
    let Hospital_UserName = req.user.UserName
    let Hospital_Name = req.user.Name
    let Bed_Number= req.body.Bed_Number
    let Bed_Type = req.body.Bed_Type
    let Ward= req.body.Ward
    let Cost= req.body.Cost;
    let Bed_Status = 'Empty' 
    let String_Date = new Date().toLocaleDateString().split(",")[0]
    
      const newUser = new beds({
        Hospital_UserName,
        Hospital_Name,
        Bed_Number,
        Bed_Type,
        Ward ,
        Cost,
        Bed_Status,
        String_Date,

        });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The Bed Has Been Successfully Added To Database')   
       res.redirect('/dashboard/AddBedForm');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
});





// handle for admitted patient list

router.get('/AdmitList', function(req, res, next){
   
    const AdmitArray = []

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName};
        db.collection('admits').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    AdmitArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(AdmitArray);
             console.log(AdmitArray.length)
               res.render('admitlist', { Admit: AdmitArray});
    });
    });
});

router.get('/DischargeList', function(req, res, next){
   
  const DischargeArray = []

  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      var db = client.db('scarhealth');
      var query = {Hospital_UserName: req.user.UserName};
      db.collection('discharges').find(query).toArray(function(err,docs){
          docs.forEach(function(doc){
              if (req.user.UserName = doc.Hospital_UserName){
                  DischargeArray.push(doc);      
           }              
             },function(){
              client.close
             })
             console.log(DischargeArray);
           console.log(DischargeArray.length)
             res.render('discharges', { Discharge: DischargeArray});
            });
          });
        });



        // Case study handle Performance
        router.post('/IPDSearch', function(req, res, next){
   
          var Search = req.body.Search
          const IpdArray = []
      
          Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
              assert.equal(null, err);
              console.log('sucessesfully connected');
              var db = client.db('scarhealth');
              var query = {Patient_ID: Search };
              db.collection('cases').find(query).toArray(function(err,docs){
                  docs.forEach(function(doc){
                      if (Search= doc.Patient_ID){
                          IpdArray.push(doc);      
                   }              
                     },function(){
                      client.close
                     })
                     console.log(IpdArray);
                   console.log(IpdArray.length)
                     res.render('casestudy', { Hospital: req.user.Hospital, Name: req.user.Name , CaseStudy: IpdArray});
          });
          });
          
      
      });
      //Handle for Viewing Available Bed
    router.get('/EmptyBedList', function(req, res, next){
   
        const AdmitArray = []
    
        Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
            assert.equal(null, err);
            console.log('sucessesfully connected');
            var db = client.db('scarhealth');
            var query = {Hospital_UserName: req.user.UserName, Bed_Status:'Empty'};
            db.collection('beds').find(query).toArray(function(err,docs){
                docs.forEach(function(doc){
                    if (req.user.UserName = doc.Hospital_UserName){
                        AdmitArray.push(doc);      
                 }              
                   },function(){
                    client.close
                   })
                   console.log(AdmitArray);
                 console.log(AdmitArray.length)
                   res.render('emptybeds', { Admit: AdmitArray});
        });
        });
    });
    

       //Handle for Viewing Occupied Bed
       router.get('/OccupiedBedList', function(req, res, next){
   
        const AdmitArray = []
    
        Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
            assert.equal(null, err);
            console.log('sucessesfully connected');
            var db = client.db('scarhealth');
            var query = {Hospital_UserName: req.user.UserName, Bed_Status:'Occupied'};
            db.collection('beds').find(query).toArray(function(err,docs){
                docs.forEach(function(doc){
                    if (req.user.UserName = doc.Hospital_UserName){
                        AdmitArray.push(doc);      
                 }              
                   },function(){
                    client.close
                   })
                   console.log(AdmitArray);
                 console.log(AdmitArray.length)
                   res.render('occupiedbeds', { Admit: AdmitArray});
        });
        });
    });

module.exports = router;