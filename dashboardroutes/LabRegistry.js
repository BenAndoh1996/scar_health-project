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


//const mongoUri = 'mongodb://localhost:27017/scarhealth';
const mongoUri = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/test?retryWrites=true&w=majority '
const conn = mongoose.createConnection(mongoUri)

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
    res.render('labupload', {
    LabID: req.file.filename} ) 
    console.log(req.file.filename)
} );


// handle for storing lab information
 router.post('/LabBrief', function(req, res){
    const labresults = require('../models/LabSchema')

    let Patients_Name = req.body.Patients_Name
    let Patient_ID = req.body.Patient_ID
    let Hospital_username= req.body.Hospital_username
    let Lab_name = req.body.Lab_name
    let date = req.body.date
    let Doctor_UserName= req.body.Doctor_UserName;
    let Lab_ID = req.body.Lab_ID
    let Lab_Type = req.body.Lab_Type
    let Description= req.body.Description
    
   
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


//LabList Handle

router.get('/LabList', function(req, res, next){
    //var url = 'mongodb://localhost:27017/scarhealth';
    var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/test?retryWrites=true&w=majority '
    const labArray = []
  
    Mongoclient.connect(url, {useNewUriParser: true}, function(err, client){
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
    //var url = 'mongodb://localhost:27017/scarhealth';
    var url = 'mongodb+srv://ben:<ben>@cluster0-0vfl6.mongodb.net/test?retryWrites=true&w=majority '
    const ViewArray = []
  
    Mongoclient.connect(url, {useNewUriParser: true}, function(err, client){
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

  // route for getting lab result the actual document
 router.post('/SearchLab', function(req, res){
    var SearchID = req.body.LabSearch
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
