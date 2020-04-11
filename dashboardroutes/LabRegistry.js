const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
 const mongoose = require('mongoose')
 const Mongoclient = require('mongodb');
 const assert = require('assert');

const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid= require('gridfs-stream')
const methodOverride = require('method-override')


const mongoUri = 'mongodb://localhost:27017/scarhealth';
//const mongoUri = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/test?retryWrites=true&w=majority '
const conn = mongoose.createConnection(mongoUri)


var url = 'mongodb://localhost:27017/scarhealth';
//var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/test?retryWrites=true&w=majority '

// init gfs
let gfs 

conn.once('open', function(){
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

//create storage object
const storage = new GridFsStorage(
    {
        url: mongoUri,
        file: (reg, file) =>{
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if(err){
                        return reject(err);
                    }
                        const filename = buf.toString('hex') + path.extname(file.originalname);
                        const fileinfo = {
                            filename:filename,
                            bucketName: 'uploads'
                        };
                        resolve(fileinfo);
                })
            })
        }
    
        
    }
)
const upload = multer({storage})


//Doctors login Handle
router.get('/LabForm', function(req, res){
    res.render('labform') 
 } );
  
//search post route
router.post('/LabInput', upload.single('file'), function(req, res){
    //res.json({file: req.file})

    const ViewArray = []
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName };
        db.collection('requests').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    ViewArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(ViewArray);
             console.log(ViewArray.length)
               res.render('viewrequest', { ViewArray: ViewArray, LabID: (req.file.filename), UserName:req.user.UserName,Hospital:req.user.Hospital });
     });
  });
   
} );


// handle for storing lab information
 router.post('/LabBrief', function(req, res){
    const labresults = require('../models/LabSchema')

    let Patients_Name = (req.body.Patients_Name)
    let Patient_ID = (req.body.Patient_ID).replace(/\s/g, '')
    let Hospital_username= (req.body.Hospital_username).replace(/\s/g, '')
    let Lab_name = req.body.Lab_name
    let date = req.body.date
    let Doctor_UserName= (req.body.Doctor_UserName).replace(/\s/g, '');
    let Lab_ID = (req.body.Lab_ID).replace(/\s/g, '')
    let Lab_Type = req.body.Lab_Type
    let Description= req.body.Description
    let Unique = (req.body.Unique).replace(/\s/g, '');
    let String_Date = new Date().toLocaleDateString().split(",")[0]
    let Status = 'NoView'
   
      const newUser = new labresults({
        Hospital_username,
        Patients_Name,
        Patient_ID,
        Lab_name,
        Lab_ID,
         date,
        Doctor_UserName,
         Lab_Type,
        Description,
        String_Date,
        Status,
           
        });
          
        Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
          assert.equal(null, err);
          console.log('sucessesfully connected');
          let Quantity = Number(req.body.Quantity_One)
          let db = client.db('scarhealth')
          var ObjectId = require('mongodb').ObjectId
          let searchId = new ObjectId(Unique)
          let query = {Hospital_UserName: req.user.UserName, _id:searchId};
          let UpdateObj = {
            $set: {
              Status: 'Completed' }
          }
          db.collection('requests').updateOne(query,UpdateObj,(function(err,docs){
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
        req.flash('success_msg', 'The lab and Attached Description Has being Upload Sucessfully')  
       res.redirect('/dashboard/LabForm');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});


// lab billing Handle
router.get('/LabBilling', function(req, res){
    res.render('labbillform') 
 } );

router.post('/LabBillPost', function(req, res){
    
    const labbills = require('../models/LabBillSchema')

    let Patients_Name= req.body.Patients_Name
    let Patient_ID = (req.body.Patient_ID).replace(/\s/g,'')
    let Hospital_UserName = req.user.UserName
    let Doctor_Name= req.user.Name
    let Month = req.body.Month ;
    let Current_Date = req.body.Current_Date
    let Billing_One= req.body.Billing_One
    let Purpose_One= req.body.Purpose_One
    let Billing_Two= req.body.Billing_Two
    let Purpose_Two= req.body.Purpose_Two
    let String_Date = new Date().toLocaleDateString().split(",")[0]
    let Total = Number(Billing_One)+ Number(Billing_Two) 
    

      const newUser = new labbills({
          Patients_Name,
           Patient_ID,
           Hospital_UserName,
           Doctor_Name,
           Month ,
           Current_Date,
           String_Date,
           Billing_One,
           Purpose_One,
           Billing_Two,
           Purpose_Two,
           Total,
          
        });
      const Bill = [{Amount : Billing_One, Purpose: Purpose_One}, {Amount: Billing_Two, Purpose:Purpose_Two}]
     //saving a new user to database
        newUser.save()
      .then(function(){
       res.render('labreceipt', {Bill : Bill, User : Patients_Name, ID: Patient_ID, Hospital : req.user.Hospital})
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});

//LabList Handle

router.get('/LabList', function(req, res, next){
    const labArray = []
  
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_username: req.user.UserName };
        db.collection('labresults').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_username){
                    labArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(labArray);
             console.log(labArray.length)
               res.render('lablist', { LabArray: labArray});
     });
  });
  
  } );
// handle for view lab request handle

router.get('/RequestList', function(req, res, next){
    const ViewArray = []
  
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName };
        db.collection('requests').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    ViewArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(ViewArray);
             console.log(ViewArray.length)
               res.render('requestview', { ViewArray: ViewArray});
     });
  });
  
  } );


  //route for lab account summary
 router.get('/LabBills', function(req, res, next){
    var Today = new Date().toLocaleDateString().split(",")[0]
    const PatientArray = []

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName, String_Date: Today };
        db.collection('labbills').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    PatientArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(PatientArray);
             console.log(PatientArray.length)
               res.render('labbill', { Labbill: PatientArray});
    });
    });
    

});

//route for lab Monthly Account Summar
router.post('/LabMonthAccount', function(req, res, next){
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
      const Total = []
      const Money = []
      let DateToday = req.body.search
      
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth');
      let myObj =  [
        {$match: { Hospital_UserName: req.user.UserName, Month: DateToday} },
      {$group: {_id: "$String_Date", total: {$sum: "$Total"}}}
      ]
  
      let ObJ =  [
        {$match: { Hospital_UserName:  req.user.UserName, Month: DateToday} },
      {$group: {_id: "$Hospital_UserName", total: {$sum: "$Total"}}}
      ]
      
      db.collection('labbills').aggregate(myObj).toArray(function(error,sums){
        sums.forEach(function(sum){
                    Total.push(sum)    
           },function(){
            client.close
           })         
        });
  
          db.collection('labbills').aggregate(ObJ).toArray(function(error,sums){
            sums.forEach(function(sum){
                        Money.push(sum)    
               },function(){
                client.close
               })
               console.log(Total);
               console.log(Money);
               console.log(DateToday)
               
               res.render('monthlab', { Total: Total, Money: Money, date: req.body.search})
               
              });
    }) ;
  });


  // Handle for Daily Lab Accounts
router.post('/DailyLabAccounts', function(req, res,next){
    const UserArray = []
    let DateToday = new Date(req.body.search)
  
    Mongoclient.connect(process.env.MONGODB_URI ||url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let db = client.db('scarhealth');
        let query = {Hospital_UserName: req.user.UserName, Current_Date: DateToday };
  
        db.collection('labbills').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName ){
                  
                    UserArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(UserArray);
               console.log(UserArray.length);
              
    });
    });
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
      const Total = []
      const Money = []
      let DateToday = new Date(req.body.search)
      
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth');
      let myObj =  [
        {$match: { Hospital_UserName: req.user.UserName, Current_Date: DateToday} },
      {$group: {_id: "$Hospital_Username", total: {$sum: "$Total"}}}
      ]
      
      db.collection('labbills').aggregate(myObj).toArray(function(error,sums){
        sums.forEach(function(sum){
                    Total.push(sum)    
           },function(){
            client.close
           })
           console.log(Total);
           console.log(DateToday)
           
           res.render('dailylab', { Check: UserArray, Total: Total, Money: Money,  date: req.body.search})
           
          });
    }) ;
  
  });

  router.get('/LabBillTwo', function(req, res){
    const Registered = []
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName };
        db.collection('addpatientschemas').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    Registered.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(Registered);
             console.log(Registered.length)
               res.render('labbilltwo', { Hospital: req.user.Hospital, Name: req.user.Name ,Registered: Registered});
    });
    });

  })
   
  router.get('/PharmRegistered:INFOSTRING', function(req,res){
    const Info = []
    let data = req.params.INFOSTRING;
    let dataObject = JSON.parse(data);
    Info.push(dataObject)
    res.render('labbillform',{Info:Info, Department:req.user.Department})

  })

  


  // route for getting lab result the actual document
 router.get('/SearchLab:reportID', function(req, res){
    var SearchID = req.params.reportID
    console.log(SearchID)
     gfs.files.findOne({filename:SearchID}, function(err, file){
         if(!file || file.length === 0){
             return res.status(404).json({
                 err:'no file exists which matches the ID, Please consult your Laboratory for details'
             })
         }
         //file exist
         //read document or text
         const readstream = gfs.createReadStream(file.filename);
         readstream.pipe(res)
     })
 })




module.exports = router;
