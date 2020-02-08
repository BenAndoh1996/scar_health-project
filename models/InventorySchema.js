const mongoose = require('mongoose')

const InventSchema = mongoose.Schema({
    Drug_Name: {
    type: String,
    require: true
},

Drug_Type: {
    type: String,
    require: true
},

Quantity: {
    type: Number,
    require: true
},

IniQuantity: {
    type: Number,
    require: true
},

AddedQuantity: {
    type: Number,
    require: true
},

OverallQuantity: {
    type: Number,
    require: true
},

SoldQuantity: {
    type: Number,
    require: true
},

Price: {
    type: Number,
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

})

const stocks = mongoose.model('stocks', InventSchema );

module.exports= stocks;
