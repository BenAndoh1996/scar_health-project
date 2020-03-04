const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const doctor =require('../models/DocSchema')


//Doctors login Handle
router.get('/DocLogin', function(req, res){
    res.render('doclogin') 
} );

//Doctors Registration Handle
router.get('/DocRegister', function(req, res){
   res.render('docregister') 
} );


//register handle
router.post('/DocRegister', function(req, res){
    
    let Hospital = req.user.Hospital
    let UserName = req.user.UserName
    let Name = req.body.Name
    let inputEmail = req.body.inputEmail
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

module.exports = router;