const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');


// User model
const AdminSchema =require('../models/Admin')


// Admin Login Handle
router.get('/AdminLogin', function(req, res){
    res.render('adminlogin') 
})

// Admin Register Handle
router.get('/Adminregistry', function(req, res){
    res.render('adminregister') 
} );

// Admin Delete user Handle
router.get('/DeleteUser', function(req, res){
    res.render('deleteuser') 
} );

//register handle
router.post('/Adminregistry', function(req, res){
    
    let Hospital = req.user.Hospital;
    let UserName = req.user.UserName;
   let Name = req.body.Name;
    let inputEmail = req.body.inputEmail;
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
          res.render('adminregister',  {
             errors
           })
      }
      else{ 
          //validation passed
          AdminSchema.findOne({inputEmail:inputEmail })
           .then(admin => {
               if(admin){
                   //user exist
                   errors.push({msg: 'Email allready exist'})
                   res.render('adminregister', {
                       errors
                   })
               }else{
                   const newAdmin = new AdminSchema({
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
                       bcrypt.hash(newAdmin.password, salt, (err, hash) =>{
                          if(err) throw err;
                         //set password to hash 
                          newAdmin.password = hash;

                          //saving a new user to database
                          newAdmin.save()
                          .then(function(){
                            req.flash('success_msg', 'You are now registered and you can log in')  
                              res.redirect('/dashboard/AdminLogin');
                            console.log(req.body);
                           })
                          .catch(err => console.log(err));  
                       }));
               }
           })
           
        
    } 

 
});

//login handle
router.post('/AdminLogin', (req, res, next) => {
    const User = require('../models/Admin');
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
                        return done(null, false, {message: 'Password incorrect, Consult The Admin for Authentic password'});
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
        successRedirect: '/AdminDashboard',
        failureRedirect: '/dashboard/AdminLogin',
        failureFlash:true
    })(req, res, next);
});


// routes for Admin page
router.get('/Admin', function(req, res, next){
    if(req.user.Department === 'Administrator'){
        res.render('Admin' )
        console.log(req.user.inputEmail)   
    }else{
        req.flash('success_msg', 'Based on your role Assigned by Administrator, You cannot access this page. This page can only be access by Admin. Please Contact your Admin')  
        res.redirect('/dashboard');
    }
    
} );

//var url = 'mongodb://localhost:27017/scarhealth';
var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority '




//handle for viewing new rgistered members
router.get('/newregister', function(req, res, next){
   
    const newregister = []
    let DateToday = new Date().toLocaleDateString().split(",")[0]
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName, String_Date: DateToday };
        db.collection('addpatientschemas').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    newregister.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(newregister);
             console.log(newregister.length)
             console.log(req.user.UserName)
               res.render('newregisterlist', { Hospital: req.user.Hospital, Name: req.user.Name , newregister: newregister});
    });
    });
    

});

router.post('/Monthregister', function(req, res,next){

    const UserArray = []
    
    let DateToday = req.body.search
    let Countquery = {Hospital_UserName: req.user.UserName}
    let count 
  
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let db = client.db('scarhealth');
        let query = {Hospital_UserName: req.user.UserName, Month: DateToday };
  
        db.collection('addpatientschemas').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                  
                    UserArray.push(doc);      
             }   
            
               },function(){
                client.close
               })
               console.log(UserArray);
               console.log(UserArray.length);
               
               res.render('monthregisterlist', { DateToday: DateToday, count: UserArray.length, newregister: UserArray});
              
    });
    });
})

router.post('/Dayregister', function(req, res,next){

    const UserArray = []
    
    let DateToday = new Date(req.body.search)
  
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let db = client.db('scarhealth');
        let query = {Hospital_UserName: req.user.UserName, Current_Date: DateToday };
  
        db.collection('addpatientschemas').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                  
                    UserArray.push(doc);      
             }   
            
               },function(){
                client.close
               })
               console.log(UserArray);
               console.log(UserArray.length);
               console.log(DateToday)
               res.render('dayregisterlist', { DateToday: DateToday, count: UserArray.length, newregister: UserArray});
              
    });
    });
})



router.get('/newvisit', function(req, res, next){
   
    const newregister = []
    let DateToday = new Date().toLocaleDateString().split(",")[0]
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName, String_Date: DateToday };
        db.collection('vitals').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    newregister.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(newregister);
             console.log(newregister.length)
             console.log(req.user.UserName)
               res.render('newvisit', { Hospital: req.user.Hospital, Name: req.user.Name , newregister: newregister});
    });
    });
    

});

router.post('/Monthvisits', function(req, res,next){

    const UserArray = []
    
    let DateToday = req.body.search
    let Countquery = {Hospital_UserName: req.user.UserName}
    let count 
  
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let db = client.db('scarhealth');
        let query = {Hospital_UserName: req.user.UserName, Month: DateToday };
  
        db.collection('vitals').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                  
                    UserArray.push(doc);      
             }   
            
               },function(){
                client.close
               })
               console.log(UserArray);
               console.log(UserArray.length);
               
               res.render('monthvisit', { DateToday: DateToday, count: UserArray.length, newregister: UserArray});
              
    });
    });
})

router.post('/Dayvisits', function(req, res,next){

    const UserArray = []
    
    let DateToday = new Date(req.body.search)
  
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let db = client.db('scarhealth');
        let query = {Hospital_UserName: req.user.UserName, Current_Date: DateToday };
  
        db.collection('vitals').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                  
                    UserArray.push(doc);      
             }   
            
               },function(){
                client.close
               })
               console.log(UserArray);
               console.log(UserArray.length);
               console.log(DateToday)
               res.render('dayvisit', { DateToday: DateToday, count: UserArray.length, newregister: UserArray});
              
    });
    });
})


//handle for viwing new admitted patient
router.get('/newadmissionview', function(req, res, next){
   
    const newregister = []
    let DateToday = new Date().toLocaleDateString().split(",")[0]
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName, String_Date: DateToday };
        db.collection('admits').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    newregister.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(newregister);
             console.log(newregister.length)
             console.log(req.user.UserName)
               res.render('newadmission', { Hospital: req.user.Hospital, Name: req.user.Name , newregister: newregister});
    });
    });
    

});


//handle for viwing new admitted patient
router.get('/newadischargeview', function(req, res, next){
   
    const newregister = []
    let DateToday = new Date().toLocaleDateString().split(",")[0]
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName, String_Date: DateToday };
        db.collection('discharges').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    newregister.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(newregister);
             console.log(newregister.length)
             console.log(req.user.UserName)
               res.render('newdischarge', { Hospital: req.user.Hospital, Name: req.user.Name , newregister: newregister});
    });
    });
    

});


router.post('/Monthdischarge', function(req, res,next){

    const UserArray = []
    
    let DateToday = req.body.search
   
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let db = client.db('scarhealth');
        let query = {Hospital_UserName: req.user.UserName, Month: DateToday };
  
        db.collection('discharges').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                  
                    UserArray.push(doc);      
             }   
            
               },function(){
                client.close
               })
               console.log(UserArray);
               console.log(UserArray.length);
               
               res.render('monthdischarge', { DateToday: DateToday, count: UserArray.length, newregister: UserArray});
              
    });
    });
})

router.post('/Dailydischarge', function(req, res,next){

    const UserArray = []
    
    let DateToday = new Date(req.body.search)
  
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let db = client.db('scarhealth');
        let query = {Hospital_UserName: req.user.UserName, Date_Discharge: DateToday };
  
        db.collection('discharges').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                  
                    UserArray.push(doc);      
             }   
            
               },function(){
                client.close
               })
               console.log(UserArray);
               console.log(UserArray.length);
               console.log(DateToday)
               res.render('daydischarge', { DateToday: DateToday, count: UserArray.length, newregister: UserArray});
              
    });
    });
})


// handle for admitted patient list

router.get('/GetUsers', function(req, res, next){
   
    const Doctors = []

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {UserName: req.user.UserName, Department: 'Doctor'};
        var queryOne = {UserName: req.user.UserName, Department: 'Pharmacist'};
        db.collection('users').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.UserName){
                    Doctors.push(doc);      
             }              
               },function(){
                client.close
               })
            })
               db.collection('users').find(queryOne).toArray(function(err,docs){
                const Pharmacies = []
                docs.forEach(function(doc){
                    if (req.user.UserName = doc.UserName){
                        Pharmacies.push(doc);      
                 }              
                   },function(){
                    client.close
                   })      
                   res.render('userpage', { Doctors: Doctors, Pharmacies: Pharmacies});                
            });                                        
    });

});

// handle deleting doctor
router.post('/DeleteDoctor', function(req, res){
      Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let db = client.db('scarhealth')
        let query = {UserName: req.user.UserName,  inputEmail:req.body.UserName, Name:req.body.Name};
        
        db.collection('doctors').deleteOne(query,(function(err,docs){
           if(err){
             console.log(err)
           }else{
             console.log('deleted successfull')
           }
           res.render('deleteuser');
      }));
        
   });
});

// handle deleting Pharmacy
router.post('/DeletePharmacist', function(req, res){
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth')
      let query = {UserName: req.user.UserName,  inputEmail:req.body.UserName, Name:req.body.Name};
      
      db.collection('pharmacies').deleteOne(query,(function(err,docs){
         if(err){
           console.log(err)
         }else{
           console.log('deleted successfull')
         }
         res.render('deleteuser');
    }));
      
 });
});

// handle deleting Admin
router.post('/DeleteAdmin', function(req, res){
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth')
      let query = {UserName: req.user.UserName,  inputEmail:req.body.UserName, Name:req.body.Name};
      
      db.collection('admins').deleteOne(query,(function(err,docs){
         if(err){
           console.log(err)
         }else{
           console.log('deleted successfull')
         }
         res.render('deleteuser');
    }));
      
 });
});

module.exports = router;