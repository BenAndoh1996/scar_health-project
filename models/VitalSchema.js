const mongoose = require('mongoose')

const VitalSchema =mongoose.Schema({
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

Body_Weight: {
    type: String,
    require: true
},


Sugar_Level: {
    type: String,
    require: true
},


Height: {
    type: String,
    require: true
},

Age: {
    type: String,
    require: true
},

Pulse_Rate: {
    type: String,
    require: true
},

Doctor_UserName: {
    type: String,
    require: true
},


})

const vitals= mongoose.model('vitals', VitalSchema);

module.exports= vitals;
