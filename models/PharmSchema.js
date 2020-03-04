const mongoose = require('mongoose')

const PharmSchema =mongoose.Schema({
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

const pharmacies= mongoose.model('pharmacies', PharmSchema);

module.exports= pharmacies;
