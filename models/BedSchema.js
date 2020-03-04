const mongoose = require('mongoose')

const  BedSchema =mongoose.Schema({
    Hospital_UserName: {
    type: String,
    require: true
},

Hospital_Name: {
    type: String,
    require: true
},

Bed_Number: {
    type: String,
    require: true
},
Bed_Type: {
    type: String,
    require: true
},

Ward: {
    type: String,
    require: true
},

Cost: {
    type: Number,
    require: true
},
String_Date: {
    type: String,
    require: true
},

Bed_Status: {
    type: String,
    require: true
},

})

const beds= mongoose.model('beds', BedSchema);

module.exports= beds;
