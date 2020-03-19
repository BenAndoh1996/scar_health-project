const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// User model
const User =require('../models/User')

router.get('/About', function(req, res){
    res.render('about')
})

//login page
router.get('/login', function(req, res){
    res.render('login')
})

router.get('/UserRegister', function(req, res){
    res.render('docregister')
})

//register page
router.get('/register', function(req, res){
    res.render('register')
})

router.get('/register', function(req, res){
    res.render('register')
})


//register handle
router.post('/register', function(req, res){
    
    let Hospital = req.body.Hospital
    let UserName 
    let inputEmail = req.body.inputEmail
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword
    let Department = req.body.Department
    let Name = req.body.Name
    let String_Date = new Date().toLocaleDateString().split(",")[0]
    
   
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
          res.render('register',  {
             errors
           })
      }
      else{ 
          if (Department === 'Administrator'){
              UserName = req.body.UserName
             //validation passed
            User.findOne({UserName:UserName })
            .then(user => {
              if(user){
                  //user exist
                  errors.push({msg: 'UserName allready exist'})
                  res.render('docregister', {
                      errors
                  })
        
              }else{
                  const newUser = new User({
                      Hospital:Hospital,
                      UserName:UserName,
                      inputEmail,
                      password,
                      Department,
                      Name,
                      String_Date
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
                           req.flash('success_msg', 'You are now registered and you can log in')  
                             res.redirect('/users/login');
                           console.log(req.body);
                           console.log('Administrator added')
                          })
                         .catch(err => console.log(err)); 
                      }));
                    
              }
          })  
        } else{
            UserName= req.user.UserName
                 //validation passed
          User.findOne({inputEmail:inputEmail })
          .then(user => {
              if(user){
                  //user exist
                  errors.push({msg: 'UserName allready exist'})
                  res.render('register', {
                      errors
                  })
              }else{
                  const newUser = new User({
                      Hospital:Hospital,
                      UserName:UserName,
                      inputEmail,
                      password,
                      Department,
                      Name,
                      String_Date
                      
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
                           req.flash('success_msg', 'The new user has been registered and can login ')  
                             res.redirect('/users/UserRegister');
                           console.log(req.body);
                           console.log('Users Added')
                          })
                         .catch(err => console.log(err));  
                        
                      }));
              }
          })

        }
  } 
});


//login handle
router.post('/login', (req, res, next) => {  

    //load user model
   const User = require('../models/User');
    passport.use(
        new LocalStrategy({usernameField: 'inputEmail' }, (inputEmail, password, done) => {
            // match user
            User.findOne({inputEmail: inputEmail})
            .then(user => {
                if(!user) {
                  return done(null, false, {message: 'The User Name is not registered'});  
                }
                //match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: 'Password incorrect'});
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
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash:true
    })(req, res, next);
});

// log out handle
router.get('/logout', (req, res) =>{
    req.logOut();
    req.flash('success_msg', 'you are logged out');
    res.redirect('/users/login');
});
module.exports = router;