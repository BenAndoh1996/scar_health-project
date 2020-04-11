const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');


const doctor =require('../models/DocSchema')





//Doctors Registration Handle

//register handle
router.post('/DocRegister', function(req, res){
    
    let Hospital = req.user.Hospital
    let UserName = (req.user.UserName).replace(/\s/g,'')
    let Name = req.body.Name
    let inputEmail = (req.body.inputEmail).replace(/\s/g,'')
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword
    let String_Date = new Date().toLocaleDateString().split(",")[0]
    let Department= req.body.Department
   
    let errors = []
   
    if(password.length < 6 ){
        errors.push({msg: 'Passwords should be at seven characters long!'});
        console.log(errors)
    }
    
    else if(password !== confirmPassword){
        errors.push({msg: 'Password do not match'})
        console.log(errors)
      }
       if(errors.length > 0){
          res.render('docregister',  {
             errors
           })
      }
      else{ 
          //validation passed
          doctor.findOne({inputEmail:inputEmail })
           .then(user => {
               if(user){
                   //user exist
                   errors.push({msg: ' Doctor Email allready exist'})
                   res.render('docregister', {
                       errors
                   })
               }else{
                   const newUser = new doctor({
                       Hospital:Hospital,
                       UserName:UserName,
                       Name,
                       inputEmail,
                       password,
                       String_Date,
                       Department
                   });

                   // Hash Password
                       bcrypt.genSalt(10, (err,salt) => 
                       bcrypt.hash(newUser.password, salt, (err, hash) =>{
                          if(err) throw err;
                         //set password to hash 
                          newUser.password = hash;

                          //saving a new user to database
                          newUser.save()
                          .then(function(){
                            req.flash('success_msg', 'The new doctor has been registered and can log in')  
                              res.redirect('/dashboard/DocRegister');
                            console.log(req.body);
                            
                           })
                          .catch(err => console.log(err));  
                       }));
               }
           })
           
        
    } 

 
});


//login handle
router.post('/DocLogin', (req, res, next) => {
    const User = require('../models/DocSchema');
    passport.use(
        new LocalStrategy({usernameField: 'inputEmail' }, (inputEmail, password, done) => {
            // match user
            User.findOne({inputEmail: inputEmail})
            .then(user => {
                if(!user) {
                  return done(null, false, {message: 'The Email is not registered'});  
                }
                //match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: 'Doctor login Password incorrect'});
                    }

                })
            })
            .catch(err => console.log(err));
        })
    );

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser (function(id, done){
        User.findById (id, function(err, user){
            done(err, user);
        });
    });

    passport.authenticate('local',{
        successRedirect: '/DocDashboard',
        failureRedirect: '/dashboard/DocLogin',
        failureFlash:true
    })(req, res, next);
});

var url = 'mongodb://localhost:27017/scarhealth';
//var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority'

router.get('/RegisteredPatient', function(req, res, next){
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
               res.render('registeredlist', { Hospital: req.user.Hospital, Name: req.user.Name ,Registered: Registered});
    });
    });
});


router.get('/Vitals:INFOSTRING', function(req, res){
    const Total = []
    let Info = req.params.INFOSTRING
    let InFoJSON = JSON.parse(Info)
    Total.push(InFoJSON)
     console.log(Total)
    res.render('vitaltwo',{Total:Total})
})

router.post('/PatientSearchPost', function(req, res,next){

    const Patient = []
    
    let PatientId = req.body.search
   
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let db = client.db('scarhealth');
        let query = {Patient_ID_Number: req.body.search };
        db.collection('addpatientschemas').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (PatientId = doc.Patient_ID_Number){
                    Patient.push(doc);      
             }   
            
               },function(){
                client.close
               })
               console.log(Patient);
               console.log(Patient.length);
               
               res.render('Patientsearch', { Patient: Patient, PatientId: req.body.search});
              
    });
    });
})

module.exports = router;