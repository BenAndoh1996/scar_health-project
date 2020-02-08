const mongoose = require('mongoose')

const  Appointment =mongoose.Schema({
    Doctor_UserName: {
    type: String,
    require: true
},

patient_name: {
    type: String,
    require: true
},

patient_ID: {
    type: String,
    require: true
},
Appointment_Date: {
    type: String,
    require: true
},

date: {
    type: Date,
    default:Date.now
},

Purpose: {
    type: String,
    require: true
},
Contact: {
    type: String,
    require: true
},



})

const appoints= mongoose.model('appoints', Appointment);

module.exports= appoints;
