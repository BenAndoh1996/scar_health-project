const mongoose = require('mongoose')

const UserSchema =mongoose.Schema({
Patients_Name: {
    type: String,
    require: true
},

Patient_ID: {
    type: String,
    require: true
},

Hospital: {
    type: String,
    require: true
},
Doctor_Name: {
    type: String,
    require: true
},

Patient_Complaints: {
    type: String,
    require: true
},

Patient_History: {
    type: String,
    require: true
},

Diagnosis: {
    type: String,
    require: true
},

Treament: {
    type: String,
    require: true
},

Adittional_Info: {
    type: String,
    require: true
},


date: {
    type: Date,
    default: Date.now
},

})

const medical = mongoose.model('medical', UserSchema);

module.exports= medical;