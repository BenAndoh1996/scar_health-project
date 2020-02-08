const express = require('express');
const router = express.Router();
const{ensureAuthenticated }= require('../config/Auth')

router.get('/', function(req, res){
    res.render('welcome')
})
//handle dashboard
router.get('/dashboard', (req, res) =>{
    res.render('dashboard', {
        Hospital: req.user.Hospital})
});
router.get('/DocDashboard', function(req, res){
    res.render('docdashboard', {
        Hospital: req.user.Hospital, Name: req.user.Name},
        
        ) 
});

// routes for pharmacy page
router.get('/PharmDashboard',  function(req, res){
    res.render('pharmdashboard', {
        Hospital: req.user.Hospital, Name: req.user.Name} )   
} );
module.exports = router;

