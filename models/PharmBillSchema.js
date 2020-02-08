const mongoose = require('mongoose')

const PharmBillSchema= mongoose.Schema({
    Drug_One: {
    type: String,
    require: true
},

Quantity_One: {
    type: Number,
    require: true
},

Amount_One: {
    type: Number,
    require: true
},

Quantity_Two: {
    type: Number,
    require: true
},

Drug_Two: {
    type: String,
    require: true
},

Amount_Two: {
    type: Number,
    require: true
},

Drug_Three: {
    type: String,
    require: true
},

Quantity_Three: {
    type: Number,
    require: true
},
Amount_Three: {
    type: Number,
    require: true
},

Drug_Four: {
    type: String,
    require: true
},

Quantity_Four: {
    type: Number,
    require: true
},

Amount_Four: {
    type: Number,
    require: true
},

Drug_Five: {
    type: String,
    require: true
},

Quantity_Five: {
    type: Number,
    require: true
},

Amount_Five: {
    type: Number,
    require: true
},

Total: {
    type: Number,
    require: true
},


Month: {
    type: String,
    require: true
},

Current_Date: {
  type: Date(),
    require: true
},
String_Date: {
    type: String,
    require: true
},

Hospital_UserName: {
    type: String,
    require: true
},

Name: {
    type: String,
    require: true
},

InputEmail: {
    type: String,
    require: true
},

})

const pharmbills = mongoose.model('pharmbills', PharmBillSchema );

module.exports= pharmbills;
