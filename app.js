const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const bodyparser = require('body-parser')
const localstrategy = require('passport-local').Strategy
const flash = require('connect-flash')
const session = require('express-session')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const passport = require('passport')

const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid= require('gridfs-stream')
const methodOverride = require('method-override')

var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

//routes for add patient
//var indexes = require('./dashboardControllers/indexes');

//var AddNewPatient = require('./dashboardControllers/subindex');

const app = express();
//require('./config/passport')(passport);
//require('./config/AdminPassport')(passport);

/*const db = require('./config/keys').MongoUri

 //connect to mongo
mongoose.connect(db, {useNewUrlParser: true})
 .then(function(){
     console.log('mongoose db connected')
 })
 .catch(function(err){
     console.log (err)
 })
 */


mongoose.connect("mongodb://localhost/scarhealth", {useNewUrlParser: true} );

mongoose.connection.once('open', function(){
    console.log('connection has ben made')
}).on('error', function(error){
    console.log(error)
})

// later added to form upload
app.use(bodyparser.json())
app.use(methodOverride('_method'));
//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')





//bodyparser
app.use(express.urlencoded({extended: false}));

//express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//conect flash
app.use(flash());

//Global Variables
app.use((req,res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error= req.flash('error')
    next();
})

app.use('/assets', express.static('Assets'))
// Routes
app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));



// routes for dashboard
app.use('/dashboard', require('./dashboardroutes/patient'));
app.use('/dashboard', require('./dashboardroutes/patientregister'));
app.use('/dashboard', require('./dashboardroutes/patientlist'));
app.use('/dashboard', require('./dashboardroutes/AdminRegistry'));

 //routes for inner dashboard
 app.use('/dashboard', require('./dashboardroutes/DocRegistry'));
 app.use('/dashboard', require('./dashboardroutes/PharmRegistry'));
 app.use('/dashboard', require('./dashboardroutes/LabRegistry'));
 app.use('/dashboard', require('./dashboardroutes/Vital'));
 app.use('/dashboard', require('./dashboardroutes/Medical'));
 app.use('/dashboard', require('./dashboardroutes/labrequest'));
 app.use('/dashboard', require('./dashboardroutes/Drugs'));
 app.use('/dashboard', require('./dashboardroutes/Appointment'));
 app.use('/dashboard', require('./dashboardroutes/Billing'));
 app.use('/dashboard', require('./dashboardroutes/IPD'));
 app.use('/dashboard', require('./dashboardroutes/Pharmacy'));
 app.use('/dashboard', require('./dashboardroutes/Excell'));
 app.use('/dashboard', require('./dashboardroutes/AccontRegistry'));
 



// DASHBOARD CONTENT CONTROLLERS

//AddNewPatient(app);
//indexes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`serve started on port ${PORT}`));



