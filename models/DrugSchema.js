
const mongoose = require('mongoose')

const Drugs =mongoose.Schema({
    Patients_Name: {
        type: String,
        require: true
    },

    Patient_ID: {
        type: String,
        require: true
    },

    Hospital_UserName : {
        type: String,
        require: true
    },

    Doctor_Name: {
        type: String,
        require: true
    },

    Current_Date: {
        type: Date,
        require: true
    },

    String_Date: {
        type: String,
        require: true
    },

    Drug_One: {
        type: String,
        require: true
    },
    Dosage_One: {
        type: String,
        require: true
    },

    Drug_Two: {
        type: String,
        require: true
    },
    Dosage_Two: {
        type: String,
        require: true
    },
    Drug_Three: {
        type: String,
        require: true
    },
    Dosage_Three: {
        type: String,
        require: true
    },

    Drug_Four: {
        type: String,
        require: true
    },

    Dosage_Four: {
        type: String,
        require: true
    },

    Drug_Five: {
        type: String,
        require: true
    },

    Dosage_Five: {
        type: String,
        require : true
    },
    Drug_Six: {
        type: String,
        require: true
    },
    Dosage_Six: {
        type: String,
        require: true
    },
    Drug_Seven: {
        type: String,
        require: true
    },
    Dosage_Seven: {
        type: String,
        require: true
    },
    Drug_Eight: {
        type: String,
        require: true
    },
    Dosage_Eight: {
        type: String,
        require: true
    },
    Drug_Nine: {
        type: String,
        require: true
    },
    Dosage_Nine: {
        type: String,
        require: true
    },
    Drug_Ten: {
        type: String,
        require: true
    },
    Dosage_Ten: {
        type: String,
        require: true
    },

});

const drugs= mongoose.model('drugs', Drugs );
module.exports = drugs; 
