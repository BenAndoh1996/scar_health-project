const mongoose = require('mongoose')

const AdmitSchema =mongoose.Schema({
    Hospital_UserName: {
    type: String,
    require: true
},

Admission_Date: {
    type: String,
    require: true
},

Patient_Name: {
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


})

const admit= mongoose.model('admit', AdmitSchema);

module.exports= admit;
