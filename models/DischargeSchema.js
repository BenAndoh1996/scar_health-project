const mongoose = require('mongoose')

const DischargeSchema =mongoose.Schema({
    Hospital_UserName: {
    type: String,
    require: true
},

Date_Discharge: {
    type: Date,
    require: true
},

Patients_Name: {
    type: String,
    require: true
},
Patient_ID: {
    type: String,
    require: true
},



Doctor_Name: {
    type: String,
    require: true
},


Deparment: {
    type: String,
    require: true
},


Ward: {
    type: String,
    require: true
},

Bed: {
    type: String,
    require: true
},


Reason: {
    type: String,
    require: true
},

Duration: {
    type: String,
    require: true
},


Billings: {
    type: Number,
    require: true
},


Month: {
    type: String,
    require: true
},


String_Date: {
    type: String,
    require: true
},


})

const discharge= mongoose.model('discharge', DischargeSchema);

module.exports= discharge;
