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

date: {
    type: Date,
    default: Date.now
},

})

const doctor= mongoose.model('doctor', DocSchema);

module.exports= doctor;
