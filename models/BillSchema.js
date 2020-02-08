const mongoose = require('mongoose')

const BillSchema=mongoose.Schema({
    Patients_Name: {
    type: String,
    require: true
},

Patient_ID: {
    type: String,
    require: true
},

Hospital_UserName: {
    type: String,
    require: true
},
Doctor_Name: {
    type: String,
    require: true
},

Month: {
    type: String,
    require : true
},

Current_Date: {
    type: Date,
    require: true
},

String_Date: {
    type: String,
    require: true
},

Department: {
    type: String,
    require: true
},


Billing_One: {
    type: Number,
    require: true
},

Purpose_One: {
    type: String,
    require: true
},

Billing_Two: {
    type: Number,
    require: true
},

Purpose_Two: {
    type: String,
    require: true
},

Billing_Three: {
    type: Number,
    require: true
},

Purpose_Three: {
    type: String,
    require: true
},

Total: {
    type: Number,
    require: true
},

Status: {
    type: String,
    require: true
},


})

const bills= mongoose.model('bills', BillSchema);

module.exports= bills;
