const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');

//const { ensureAuthenticated } = require('../config/Auth')

var url = 'mongodb://localhost:27017/scarhealth';
//var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority'

// Routes for OPD
  router.get('/patient', function(req, res){
    res.render('opd', { Hospital: req.user.Hospital, Name: req.user.Name })   
} );

router.get('/OPDActivity', function(req, res){
    const Registered = []

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName };
        var querytwo = {UserName: req.user.UserName, Department: 'Doctor'};
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
              
    });
    db.collection('users').find(querytwo).toArray(function(err,docs){
        const Doctors = []
        docs.forEach(function(doc){
            if (req.user.UserName = doc.UserName){
                Doctors.push(doc);      
         }              
           },function(){
            client.close
           })
           console.log(Doctors)
           res.render('opdactivity', { Hospital: req.user.Hospital, Name: req.user.Name ,Registered: Registered, Doctors:Doctors});
        })
      
    });
} );
 

//routes for lab page
router.get('/Labpage', function(req, res){
    res.render('labpage' )
    
} );

//route for getting search lab page
router.get('/DocSearchLab', function(req, res){
    res.render('searchlab', {Hospital:req.user.Hospital} )
    
} );

module.exports = router;