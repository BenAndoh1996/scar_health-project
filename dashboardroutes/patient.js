const express = require('express');
const router = express.Router();

//const { ensureAuthenticated } = require('../config/Auth')

// Routes for OPD
router.get('/patient', function(req, res){
    res.render('opd', {
        Hospital: req.user.Hospital}) 
        console.log(req.user.Hospital)
} );


//routes for lab page
router.get('/Labpage', function(req, res){
    res.render('labpage' )
    
} );

//route for getting search lab page
router.get('/DocSearchLab', function(req, res){
    res.render('searchlab' )
    
} );

module.exports = router;