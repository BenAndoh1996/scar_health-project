const mongoose = require('mongoose')

const DocSchema =mongoose.Schema({
 Hospital: {
    type: String,
    require: true
},

UserName: {
    type: String,
    require: true
},

Name: {
    type: String,
    require: true
},

inputEmail: {
    type: String,
    require: true
},
password: {
    type: String,
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


})

const doctor= mongoose.model('doctor', DocSchema);

module.exports= doctor;
