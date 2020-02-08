const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// User model
const AdminSchema =require('../models/Admin')


// Admin Login Handle
router.get('/AdminLogin', function(req, res){
    res.render('adminlogin') 
})

// Admin Register Handle
router.get('/Adminregistry', function(req, res){
    res.render('adminregister', {
        Hospital: req.user.Hospital})   
} );



//register handle
router.post('/Adminregistry', function(req, res){
    
    let Hospital = req.body.Hospital;
    let UserName = req.body.UserName;
   let Name = req.body.Name;
    let inputEmail = req.body.inputEmail;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword
   
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
                       password
                      
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
        successRedirect: '/dashboard/Admin',
        failureRedirect: '/dashboard/AdminLogin',
        failureFlash:true
    })(req, res, next);
});


// routes for Admin page
router.get('/Admin', function(req, res, next){
    res.render('Admin' )
    console.log(req.user.inputEmail)
    
} );



module.exports = router;