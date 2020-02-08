const express = require('express');
const router = express.Router();

//Add patient model
const AddpatientSchema = require('../models/AddpatientSchema');

// patient registeration page
router.get('/Patientregister', function(req, res){
    res.render('addpatients')
} );

//patient registration handle
router.post('/patientregister', function(req, res){
    const{ Insurance_Provider,Health_facility_No,Month,Health_Insurance_ID,Full_Name,Age,gender,state,Religion,birth_date,Patient_ID_Number,Telephone, Occupation,Next_of_King,Next_of_King_Number,} = req.body;
    let String_Date= new Date().toLocaleDateString().split(",")[0]
    let Hospital_Name = req.user.Hospital
    let Current_Date = req.body.Current_Date
    let Hospital_UserName = req.user.UserName
    let errors =[];

    //check require fields
    if( !Patient_ID_Number){
        errors.push({msg: 'Please fill all fields'});
    }

    if(errors.length > 0){

    }else{
        //Saving patient to database
          AddpatientSchema.findOne({ Patient_ID_Number: Patient_ID_Number})
        .then(user => {
            if(user){
                //patient exist
                errors.push({msg: 'Patient ID Number Allready Exist. Please Kindly Use New ID'})
                res.render('addpatients', {
                    errors,
                    Patient_ID_Number
                });
            }else{
                const newPatient = new AddpatientSchema({
                    Insurance_Provider,
                    Health_facility_No,
                    Health_Insurance_ID,
                    Full_Name,
                    Age,
                    Telephone,
                    gender,
                    state,
                    Religion,
                    birth_date,
                    Patient_ID_Number,
                    Next_of_King,
                    Occupation,
                    Next_of_King_Number,
                    Hospital_Name,
                    Hospital_UserName,
                    Month,
                    Current_Date,
                    String_Date
                });
                //saving to database
                newPatient.save()
                .then(function(){
                    req.flash('success_msg', 'The New Patient Has been Registered Successfully')  
                      res.redirect('/dashboard/Patientregister');
                    console.log(req.body);
                   })

                  .catch(err => console.log(err));
                  console.log(req.body)                
            }
        });
    }
   
})



module.exports = router;