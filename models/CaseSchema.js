const mongoose = require('mongoose')

const CaseSchema =mongoose.Schema({
    Patients_Name: {
    type: String,
    require: true
},

Patient_ID: {
    type: String,
    require: true
},

Temperature: {
    type: String,
    require: true
},
Blood_Level: {
    type: String,
    require: true
},

date: {
    type: Date,
    default: Date.now
},

Sugar_Level: {
    type: String,
    require: true
},


Pulse_Rate: {
    type: String,
    require: true
},


Current_State: {
    type: String,
    require: true
},

Observations: {
    type: String,
    require: true
},


Adittional_Info: {
    type: String,
    require: true
},


})

const cases= mongoose.model('cases', CaseSchema);

module.exports= cases;
