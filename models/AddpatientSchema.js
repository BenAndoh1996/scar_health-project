
const mongoose = require('mongoose')

const PatientSchema =mongoose.Schema({
    Insurance_Provider: {
        type: String,
        require: true
    },

    Health_Insurance_ID : {
        type: String,
        require: true
    },

    Full_Name: {
        type: String,
        require: true
    },

    Age: {
        type: Number,
        require: true
    },

    gender: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },

    Religion: {
        type: String,
        require: true
    },
    birth_date: {
        type: String,
        require: true
    },
    Patient_ID_Number: {
        type: String,
        require: true
    },
    Occupation: {
        type: String,
        require: true
    },

    Telephone: {
        type: String,
        require: true
    },

    Next_of_King: {
        type: String,
        require: true
    },

    Next_of_King_Number: {
        type: String,
        require: true
    },

    Current_Date: {
        type: Date,
         require: true
    },

    Hospital_Name: {
        type: String,
        require: true
    },

    String_Date: {
        type: String,
        require: true
    },

    Month: {
        type: String,
        require: true
    },

    Hospital_UserName : {
        type: String,
        require: true
    },
    

});

const AddpatientSchema = mongoose.model('AddpatientSchema', PatientSchema );
module.exports = AddpatientSchema; 
