const express = require('express');
const router = express.Router();
const{ensureAuthenticated } = require('../config/Auth')

router.get('/', function(req, res){
    res.render('index')
})
//handle dashboard
router.get('/dashboard',  (req, res) =>{
    res.render('dashboard', {
        Hospital: req.user.Hospital, Name: req.user.Name, Department: req.user.Department},)
});

router.get('/DocDashboard', (req, res) =>{
    res.render('docdashboard', {
         Name: req.user.Name},)
});

// routes for pharmacy page

router.get('/PharmDashboard', (req, res) =>{
    res.render('pharmdashboard', {
     Name: req.user.Name},)
});

// routes for pharmacy page
router.get('/AdminDashboard',  function(req, res){
    res.render('admindasboard', {
         Name: req.user.Name},)   
} );


module.exports = router;

