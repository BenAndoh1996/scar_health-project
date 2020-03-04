const mongoose = require('mongoose')

const AdmitSchema =mongoose.Schema({
    Hospital_UserName: {
    type: String,
    require: true
},

Current_Date: {
    type: Date,
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

Month: {
    type: String,
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

Year: {
    type: String,
    require: true
},

})

const admit= mongoose.model('admit', AdmitSchema);

module.exports= admit;
