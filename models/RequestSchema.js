const mongoose = require('mongoose')


const  RequestSchema =mongoose.Schema({
    Doctor_Name: {
    type: String,
    require: true
},

Hospital_UserName: {
    type: String,
    require: true
},

Doctor_UserName: {
    type: String,
    require: true
},

patient_name: {
    type: String,
    require: true
},

Patient_ID: {
    type: String,
    require: true
},

Sample_ID: {
    type: String,
    require: true
},

date: {
    type: Date,
    default: Date.now
},

Lab_Type: {
    type: String,
    require: true
},


Description: {
    type: String,
    require: true
},




})

const request= mongoose.model('request', RequestSchema);

module.exports= request;
