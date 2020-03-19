const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');

router.get('/Billing', function(req, res){
  res.render('billings') 
} );



//Post Receipt Handle
router.post('/GenerateReceipt', function(req, res){
  
  let Patients_Name= req.body.Name
  let Patient_ID = req.body.UserName
  let Hospital = req.user.Hospital
  let Billing_One= Number(req.body.Billing_One)
  let Purpose_One= req.body.Billing_One_Purpose
  let Billing_Two= Number(req.body.Billing_Two)
  let Purpose_Two= req.body.Billing_Two_Purpose
  let Billing_Three = Number(req.body.Billing_Three)
  let Purpose_Three = req.body.Billing_Three_Purpose
  let Message = 'Type your Name Here'

  const Bill = [{Amount:Billing_One, Purpose: Purpose_One}, {Amount: Billing_Two, Purpose: Purpose_Two}, {Amount: Billing_Three, Purpose:Purpose_Three}]

  res.render('receipt', {Bill : Bill, Hospital: Hospital, User:Patients_Name , PatientID:Patient_ID, Message:Message})
})

//var url = 'mongodb://localhost:27017/scarhealth';
var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority '

router.get('/GetBills', function(req, res, next){
   
    var Today = new Date().toLocaleDateString().split(",")[0]
    const PatientArray = []

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Hospital_UserName: req.user.UserName, String_Date: Today, Status:'No' };
        db.collection('bills').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName){
                    PatientArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(PatientArray);
             console.log(PatientArray.length)
               res.render('accounts', { Getbill: PatientArray});
    });
    });
    

});

// Handle for Daily Account Check 
router.post('/AccountCheck', function(req, res,next){

    const UserArray = []
    let DateToday = new Date(req.body.search)
  
    Mongoclient.connect(process.env.MONGODB_URI ||url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let db = client.db('scarhealth');
        let query = {Hospital_UserName: req.user.UserName, Current_Date: DateToday };
  
        db.collection('bills').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.UserName = doc.Hospital_UserName ){
                  
                    UserArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(UserArray);
               console.log(UserArray.length);
              
    });
    });
    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
      const Total = []
      const Money = []
      let DateToday = new Date(req.body.search)
      
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth');
      let myObj =  [
        {$match: { Hospital_UserName: req.user.UserName, Current_Date: DateToday} },
      {$group: {_id: "$Hospital_Username", total: {$sum: "$Total"}}}
      ]
      
      db.collection('bills').aggregate(myObj).toArray(function(error,sums){
        sums.forEach(function(sum){
                    Total.push(sum)    
           },function(){
            client.close
           })
           console.log(Total);
           console.log(DateToday)
           
           res.render('accountcheck', { Check: UserArray, Total: Total, Money: Money,  date: req.body.search})
           
          });
    }) ;
  
  });

//handle monthly Account Search
router.post('/AccountMonthSearch', function(req, res, next){
   
  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
    const Total = []
    const Money = []
    let DateToday = req.body.search
    
    assert.equal(null, err);
    console.log('sucessesfully connected');
    let db = client.db('scarhealth');
    let myObj =  [
      {$match: { Hospital_UserName: req.user.UserName, Month: DateToday} },
    {$group: {_id: "$String_Date", total: {$sum: "$Total"}}}
    ]

    let ObJ =  [
      {$match: { Hospital_UserName:  req.user.UserName, Month: DateToday} },
    {$group: {_id: "$Hospital_UserName", total: {$sum: "$Total"}}}
    ]
    
    db.collection('bills').aggregate(myObj).toArray(function(error,sums){
      sums.forEach(function(sum){
                  Total.push(sum)    
         },function(){
          client.close
         })         
      });

        db.collection('bills').aggregate(ObJ).toArray(function(error,sums){
          sums.forEach(function(sum){
                      Money.push(sum)    
             },function(){
              client.close
             })
             console.log(Total);
             console.log(Money);
             console.log(DateToday)
             
             res.render('monthlyaccount', { Total: Total, Money: Money, date: req.body.search})
             
            });
  }) ;
    

});


//handle for lab search in the doctors department
router.get('/DocLabList', function(req, res, next){
   
    const DocLabArray = []

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        var db = client.db('scarhealth');
        var query = {Doctor_UserName: req.user.inputEmail };
        db.collection('labresults').find(query).toArray(function(err,docs){
            docs.forEach(function(doc){
                if (req.user.inputEmail = doc.Doctor_UserName){
                    DocLabArray.push(doc);      
             }              
               },function(){
                client.close
               })
               console.log(DocLabArray);
             console.log(DocLabArray.length)
               res.render('doclablist', { Hospital: req.user.Hospital, Name: req.user.Name , DocLabArray: DocLabArray});
    });
    });
    

});

 
        //route for  deleting Account view at doctor side
        router.delete('/Accountdelete/:ID', function(req, res){
          var ObjectId = require('mongodb').ObjectId
          let item = req.params.ID
          let searchId = new ObjectId(item)
        console.log(searchId)
          Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
          assert.equal(null, err);
          console.log('sucessesfully connected');
          let db = client.db('scarhealth')
          let query = {Hospital_UserName: req.user.UserName, _id : searchId};
          let UpdateObj = {
            $set: {
              Status: 'Viewed' }
          }
          db.collection('bills').updateOne(query,UpdateObj,(function(err,data){
            if(err){
              console.log(err)
            }else{
              res.json(data)
              console.log('Updated successfully')
            }
        }));
        
        });
          
        } );
        

module.exports = router;