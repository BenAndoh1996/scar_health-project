const mongoose = require('mongoose')

const UserSchema =mongoose.Schema({
    Full_Name: {
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

Birth_Date: {
    type: String,
    require: true
},

Address: {
    type: String,
    require: true
},

Telephone: {
    type: String,
    require: true
},

Reffered : {
    type: String,
    require: true
},

Site: {
    type: String,
    require: true
},


Onset: {
    type: String,
    require: true
},

Time_Course: {
    type: String,
    require: true
},
Severity: {
    type: String,
    require: true
},

Charater : {
    type: String,
    require: true
},

 Radiations: {
    type: String,
    require: true
},

Associations: {
    type: String,
    require: true
},

Relieving : {
    type: String,
    require: true
},

Family: {
    type: String,
    require: true
},


Prior : {
    type: String,
    require: true
},

Present: {
    type: String,
    require: true
},

Medication: {
    type: String,
    require: true
},

Sedentary: {
    type: String,
    require: true
},

Work : {
    type: String,
    require: true
},

Habits: {
    type: String,
    require: true
},


OE: {
    type: String,
    require: true
},

CVS: {
    type: String,
    require: true
},
Chest: {
    type: String,
    require: true
},

Abdominal : {
    type: String,
    require: true
},

CNS: {
    type: String,
    require: true
},

GI: {
    type: String,
    require: true
},

Review : {
    type: String,
    require: true
},

Summary: {
    type: String,
    require: true
},


Diagnosis : {
    type: String,
    require: true
},

Treatment: {
    type: String,
    require: true
},

any : {
    type: String,
    require: true
},

Lab_type: {
    type: String,
    require: true
},


Lab_ID: {
    type: String,
    require: true
},

Description: {
    type: String,
    require: true
},

surgical: {
    type: String,
    require: true
},


Drugs: {
    type: String,
    require: true
},

Remarks: {
    type: String,
    require: true
},
String_Date: {
    type: String,
    require: true
},


})

const medical = mongoose.model('medical', UserSchema);

module.exports= medical;