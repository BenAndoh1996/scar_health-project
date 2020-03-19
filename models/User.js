const mongoose = require('mongoose')

const UserSchema =mongoose.Schema({
Hospital: {
    type: String,
    require: true
},

UserName: {
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

Department: {
    type: String,
    require: true
},

Name: {
    type: String,
    require: true
},

date: {
    type: Date,
    default: Date.now
},

String_Date: {
    type: String,
    require: true
},

})

const User = mongoose.model('User', UserSchema);

module.exports= User;
