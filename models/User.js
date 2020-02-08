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

email: {
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

const User = mongoose.model('User', UserSchema);

module.exports= User;
