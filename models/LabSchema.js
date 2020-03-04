const mongoose = require('mongoose')

const  UploadSchema =mongoose.Schema({
    Patients_Name: {
    type: String,
    require: true
},

    Patient_ID: {
    type: String,
    require: true
},

Hospital_username: {
    type: String,
    require: true
},

Lab_name: {
    type: String,
    require: true
},
Doctor_UserName: {
    type: String,
    require: true
},

date: {
    type: Date,
    default: Date.now
},

Lab_ID: {
    type: String,
    require: true
},


Lab_Type: {
    type: String,
    require: true
},

Description: {
    type: String,
    require: true
},

String_Date: {
    type: String,
    require: true
},

Status: {
    type: String,
    require: true
},


})

const labresults= mongoose.model('labresults', UploadSchema);

module.exports= labresults;
