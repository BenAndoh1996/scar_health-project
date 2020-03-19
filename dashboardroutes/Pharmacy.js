const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');

//Doctors login Handle
router.get('/PatientVital', function(req, res){
    res.render('patientvital') 
} );

router.get('/InventoryForm', function(req, res){
  res.render('inventory') 
} );

router.get('/PharmBill', function(req, res){
  res.render('pharmbill') 
} );


//Adding Inventory handle
router.post('/InventoryForm', function(req, res){

  const stocks = require('../models/InventorySchema')
    
    let Drug_Name = (req.body.Drug_Name).toLowerCase()
    let Drug_Type = req.body.Drug_Type
    let Quantity = req.body.Quantity
    let Price = req.body.Price
    let Hospital_UserName = req.user.UserName
    let IniQuantity = req.body.Quantity
    let AddedQuantity = 0
    let OverallQuantity =req.body.Quantity
    let SoldQuantity = 0
    let Name = req.user.Name   
   
      const newUser = new stocks({
          Drug_Name,
           Drug_Type,
          Quantity,
          IniQuantity,
          AddedQuantity,
          OverallQuantity,
          SoldQuantity,
           Price,
           Hospital_UserName,
           Name
        });

     //saving a new user to database
        newUser.save()
      .then(function(){
        req.flash('success_msg', 'The drug has been added to stocks')  
       res.redirect('/dashboard/InventoryForm');
        console.log(req.body);
        })
      .catch(err => console.log(err));  
                    
});

//Handle for Updating Stock

 //var url = 'mongodb://localhost:27017/scarhealth';
  var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority '


router.post('/UpdateStocks', function(req, res, next){

    Mongoclient.connect( process.env.MONGODB_URI ||url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let Quantity = Number(req.body.Quantity)
        let drugName = (req.body.Drug_Name).toLowerCase()
        let db = client.db('scarhealth')
        var query = {Hospital_UserName: req.user.UserName, Drug_Name:drugName};
        var UpdateObj = {
          $inc: {
            Quantity: Quantity, AddedQuantity: Quantity, OverallQuantity: Quantity }
        }
        db.collection('stocks').updateOne(query,UpdateObj,(function(err,docs){
           if(err){
             console.log(err)
             console.log(Quantity)
           }else{
             console.log('Updated successfully')
           }
      }));
      
   });
    
    res.render('inventory')
});


//handle for pharmacy billings
router.post('/PharmBill', function(req, res, next){
  
  const Message = 'Pharmacy billings for medicine dispensing'

  const pharmbills = require('../models/PharmBillSchema')
    
    let Drug_One = (req.body.Drug_One).toLowerCase()
    let Quantity_One = req.body.Quantity_One
    let Amount_One = req.body.Amount_One
    let Drug_Two= (req.body.Drug_Two).toLowerCase()
    let Quantity_Two = req.body.Quantity_Two
    let Amount_Two = req.body.Amount_Two
    let Drug_Three = (req.body.Drug_Three).toLowerCase()
    let Quantity_Three = req.body.Quantity_Three
    let Amount_Three = req.body.Amount_Three
    let Drug_Four = (req.body.Drug_Four).toLowerCase()
    let Quantity_Four = req.body.Quantity_Four
    let Amount_Four = req.body.Amount_Four
    let Drug_Five = (req.body.Drug_Five).toLowerCase()
    let Quantity_Five = req.body.Quantity_Five
    let Amount_Five = req.body.Amount_Five
    let Total = Number(Amount_One)+ Number(Amount_Two) + Number(Amount_Three) + Number(Amount_Four) + Number(Amount_Five)
    let Month = req.body.Month
    let Current_Date = new Date(req.body.Current_Date)
    let Hospital_UserName = req.user.UserName
    let String_Date = new Date().toLocaleDateString().split(",")[0]
    let Name = req.user.Name   
    let InputEmail = req.user.inputEmail
   
      const newUser = new pharmbills({
        Drug_One,
        Quantity_One,
        Amount_One,
        Drug_Two,
        Quantity_Two,
        Amount_Two,
        Drug_Three,
        Quantity_Three,
        Amount_Three,
        Drug_Four,
        Quantity_Four,
        Amount_Four,
        Drug_Five,
        Quantity_Five,
        Amount_Five,
        Total,
        Month,
        Current_Date,
        String_Date,
        Hospital_UserName,
        Name,
        InputEmail
        });

        const Bill = [{Name: Drug_One, Quantity: Quantity_One, }, {Name:Drug_Two, Quantity:Quantity_Two}]
      // handle for updating 
      Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
        assert.equal(null, err);
        console.log('sucessesfully connected');
        let Quantity = Number(req.body.Quantity_One)
        let db = client.db('scarhealth')
        let query = {Hospital_UserName: req.user.UserName, Drug_Name:Drug_One};
        let UpdateObj = {
          $inc: {
            SoldQuantity: Quantity, Quantity: -Quantity }
        }
        db.collection('stocks').updateOne(query,UpdateObj,(function(err,docs){
           if(err){
             console.log(err)
           }else{
             console.log('Updated successfully')
           }
      }));
      
   });

   Mongoclient.connect(process.env.MONGODB_URI || url, {useNewUriParser: true}, function(err, client){
    assert.equal(null, err);
    console.log('sucessesfully connected');
    let Quantity = Number(req.body.Quantity_Two)
    let db = client.db('scarhealth')
    let query = {Hospital_UserName: req.user.UserName, Drug_Name: Drug_Two};
    let UpdateObj = {
      $inc: {
        SoldQuantity: Quantity, Quantity: -Quantity }
    }
    db.collection('stocks').updateOne(query,UpdateObj,(function(err,docs){
       if(err){
         console.log(err)
       }else{
         console.log('Updated successfully')
       }
  }));
  
});

    Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
    assert.equal(null, err);
    console.log('sucessesfully connected');
   let Quantity = Number(req.body.Quantity_Three)
   let db = client.db('scarhealth')
   let query = {Hospital_UserName: req.user.UserName, Drug_Name: Drug_Three};
   let UpdateObj = {
     $inc: {
      SoldQuantity: Quantity, Quantity: -Quantity }
   }
   db.collection('stocks').updateOne(query,UpdateObj,(function(err,docs){
     if(err){
       console.log(err)
       console.log(Quantity)
     }else{
       console.log('Updated successfully')
     }
 }));

  });

   Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
  assert.equal(null, err);
  console.log('sucessesfully connected');
  let Quantity = Number(req.body.Quantity_Four)
  let db = client.db('scarhealth')
  let query = {Hospital_UserName: req.user.UserName, Drug_Name: Drug_Four};
  let UpdateObj = {
    $inc: {
      SoldQuantity: Quantity, Quantity: -Quantity }
   }
  db.collection('stocks').updateOne(query,UpdateObj,(function(err,docs){
     if(err){
       console.log(err)
       console.log(Quantity)
     }else{
       console.log('Updated successfully')
     }
 }));

 });

  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
   assert.equal(null, err);
   console.log('sucessesfully connected');
   let Quantity = Number(req.body.Quantity_Five)
   let db = client.db('scarhealth')
   let query = {Hospital_UserName: req.user.UserName, Drug_Name: Drug_Five};
   let UpdateObj = {
    $inc: {
      SoldQuantity: Quantity, Quantity: -Quantity }
  }
  db.collection('stocks').updateOne(query,UpdateObj,(function(err,docs){
     if(err){
       console.log(err)
       console.log(Quantity)
     }else{
       console.log('Updated successfully')
     }
}));

});
     
newUser.save()
.then(function(){
   res.render('pharmreceipt',{ Total: Total,  Message:Message, Name: Name, Hospital:req.user.Hospital, Date:Current_Date} )
  console.log(InputEmail);
  })
.catch(err => console.log(err)); 
});

 
// Handle for Checking Stock

router.get('/ViewStock', function(req, res,next){
  const StockArray = []
  var Available
  Mongoclient.connect(url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth');
      let query = {Hospital_UserName: req.user.UserName};
      db.collection('stocks').find(query).toArray(function(err,docs){
          docs.forEach(function(doc){
              if (req.user.UserName = doc.Hospital_UserName){
               Available = doc.OverallQuantity - doc.SoldQuantity
                  StockArray.push(doc);      
           }              
             },function(){
              client.close
             })
             console.log(StockArray);
           console.log(StockArray.length)
             res.render('viewstock', { Stocks: StockArray});
  });
  });
});
// Handle for user sale 
router.get('/UserSales', function(req, res,next){
  const UserArray = []
  let DateToday = new Date().toLocaleDateString().split(",")[0]

  Mongoclient.connect(url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth');
      let query = {Hospital_UserName: req.user.UserName, InputEmail: req.user.inputEmail, String_Date: DateToday };

      db.collection('pharmbills').find(query).toArray(function(err,docs){
          docs.forEach(function(doc){
              if (req.user.inputEmail = doc.InputEmail ){
                
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
    let DateToday = new Date().toLocaleDateString().split(",")[0]
    assert.equal(null, err);
    console.log('sucessesfully connected');
    let db = client.db('scarhealth');
    let myObj =  [
      {$match: { InputEmail:  req.user.inputEmail, String_Date: DateToday} },
    {$group: {_id: "$Name", total: {$sum: "$Total"}}}
    ]
    
    db.collection('pharmbills').aggregate(myObj).toArray(function(error,sums){
      sums.forEach(function(sum){
                  Total.push(sum)    
         },function(){
          client.close
         })
         console.log(Total);
         res.render('usersales', { Sales: UserArray, Total: Total})
        });
  }) ;

});


// Handle for Pharmacy Sales 
router.get('/PharmSales', function(req, res,next){
  const SaleArray = []
  let DateToday = new Date().toLocaleDateString().split(",")[0]
  
  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth');
      let query = {Hospital_UserName: req.user.UserName, String_Date: DateToday };

      db.collection('pharmbills').find(query).toArray(function(err,docs){
          docs.forEach(function(doc){
              if (req.user.UserName = doc.Hospital_UserName ){
                
                  SaleArray.push(doc);      
           }              
             },function(){
              client.close
             })
             console.log(SaleArray);
             console.log(SaleArray.length);
            
  });
  });
  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
    const Total = []
    let DateToday = new Date().toLocaleDateString().split(",")[0]
    assert.equal(null, err);
    console.log('sucessesfully connected');
    let db = client.db('scarhealth');
    let myObj =  [
      {$match: {  Hospital_UserName: req.user.UserName, String_Date: DateToday} },
    {$group: {_id: "$Hospital_UserName", total: {$sum: "$Total"}}}
    ]
    
    db.collection('pharmbills').aggregate(myObj).toArray(function(error,sums){
      sums.forEach(function(sum){
                  Total.push(sum)    
         },function(){
          client.close
         })
         console.log(Total);
         res.render('pharmsales', { SaleArray: SaleArray, TotalSale: Total})
        });
  }) ;

});

// Handle for Staff Sales 
router.get('/StaffSales', function(req, res,next){

  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
    const Staff = []
    let DateToday = new Date().toLocaleDateString().split(",")[0]
    assert.equal(null, err);
    console.log('sucessesfully connected');
    let db = client.db('scarhealth');
    let myObj =  [
      {$match: {  Hospital_UserName:  req.user.UserName, String_Date: DateToday } },
    {$group: {_id: "$Name", total: {$sum: "$Total"}}}
    ]
    
    db.collection('pharmbills').aggregate(myObj).toArray(function(error,sums){
      sums.forEach(function(sum){
                  Staff.push(sum)    
         },function(){
          client.close
         })
         console.log(Staff);
         console.log(Staff.length);
         res.render('staffsale', { StaffSale: Staff})
        });
  }) ;

});

// Handle for user sale 
router.post('/DaySearch', function(req, res,next){

  const UserArray = []
  let DateToday = new Date(req.body.search)

  Mongoclient.connect(url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth');
      let query = {Hospital_UserName: req.user.UserName, InputEmail: req.user.inputEmail, Current_Date: DateToday };

      db.collection('pharmbills').find(query).toArray(function(err,docs){
          docs.forEach(function(doc){
              if (req.user.inputEmail = doc.InputEmail ){
                
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
      {$match: { InputEmail:  req.user.inputEmail, Current_Date: DateToday} },
    {$group: {_id: "$Name", total: {$sum: "$Total"}}}
    ]
    
    db.collection('pharmbills').aggregate(myObj).toArray(function(error,sums){
      sums.forEach(function(sum){
                  Total.push(sum)    
         },function(){
          client.close
         })
         console.log(Total);
         console.log(DateToday)
         
         res.render('daysearch', { Sales: UserArray, Total: Total, Money: Money,  date: req.body.search})
         
        });
  }) ;

});

// Handle for monthly search
router.post('/MonthSearch', function(req, res,next){

  const UserArray = []
  
  let DateToday = req.body.search

  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth');
      let query = {Hospital_UserName: req.user.UserName, InputEmail: req.user.inputEmail, Month: DateToday };

      db.collection('pharmbills').find(query).toArray(function(err,docs){
          docs.forEach(function(doc){
              if (req.user.inputEmail = doc.InputEmail ){
                
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
    let DateToday = (req.body.search)
    
    assert.equal(null, err);
    console.log('sucessesfully connected');
    let db = client.db('scarhealth');
    let myObj =  [
      {$match: { InputEmail:  req.user.inputEmail, Month: DateToday} },
    {$group: {_id: "$Name", total: {$sum: "$Total"}}}
    ]

    let ObJ =  [
      {$match: { InputEmail:  req.user.inputEmail, Month: DateToday} },
    {$group: {_id: "$String_Date", total: {$sum: "$Total"}}}
    ]
    
    db.collection('pharmbills').aggregate(myObj).toArray(function(error,sums){
      sums.forEach(function(sum){
                  Total.push(sum)    
         },function(){
          client.close
         })
         console.log(Total);
         console.log(DateToday)
         
        
         
        });

        db.collection('pharmbills').aggregate(ObJ).toArray(function(error,sums){
          sums.forEach(function(sum){
                      Money.push(sum)    
             },function(){
              client.close
             })
             console.log(Money);
             console.log(Money.length)
             
             res.render('monthsearch', { Sales: UserArray, Total: Total, Money: Money, date: req.body.search})
             
            });
  }) ;

});

// Handle for Pharmacy Sales
router.post('/pharmSale', function(req, res,next){

  const UserArray = []
  let DateToday = new Date(req.body.search)

  Mongoclient.connect(process.env.MONGODB_URI ||  url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth');
      let query = {Hospital_UserName: req.user.UserName, Current_Date: DateToday };

      db.collection('pharmbills').find(query).toArray(function(err,docs){
          docs.forEach(function(doc){
              if (doc.Hospital_UserName = req.user.UserName ){
                
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
    
    db.collection('pharmbills').aggregate(myObj).toArray(function(error,sums){
      sums.forEach(function(sum){
                  Total.push(sum)    
         },function(){
          client.close
         })
         console.log(Total);
         console.log(DateToday)
         
         res.render('daysearch', { Sales: UserArray, Total: Total, Money: Money,  date: req.body.search})
         
        });
  }) ;

});



// Handle for Pharmacy monthly search
router.post('/PharmMonthSearch', function(req, res,next){

  const UserArray = []
  
  let DateToday = req.body.search

  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
      assert.equal(null, err);
      console.log('sucessesfully connected');
      let db = client.db('scarhealth');
      let query = {Hospital_UserName: req.user.UserName, Month: DateToday };

      db.collection('pharmbills').find(query).toArray(function(err,docs){
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
  Mongoclient.connect(url, {useUnifiedTopology: true}, function(err, client){
    const Total = []
    const Money = []
    let DateToday = (req.body.search)
    
    assert.equal(null, err);
    console.log('sucessesfully connected');
    let db = client.db('scarhealth');
    let myObj =  [
      {$match: { Hospital_UserName: req.user.UserName, Month: DateToday} },
    {$group: {_id: "$Name", total: {$sum: "$Total"}}}
    ]

    let ObJ =  [
      {$match: { Hospital_UserName: req.user.UserName, Month: DateToday} },
    {$group: {_id: "$String_Date", total: {$sum: "$Total"}}}
    ]
    
    db.collection('pharmbills').aggregate(myObj).toArray(function(error,sums){
      sums.forEach(function(sum){
                  Total.push(sum)    
         },function(){
          client.close
         })
         console.log(Total);
         console.log(DateToday)
         
        
         
        });

        db.collection('pharmbills').aggregate(ObJ).toArray(function(error,sums){
          sums.forEach(function(sum){
                      Money.push(sum)    
             },function(){
              client.close
             })
             console.log(Money);
             console.log(Money.length)
             
             res.render('monthsearch', { Sales: UserArray, Total: Total, Money: Money, date: req.body.search})
             
            });
  }) ;

});

//Handle for Staff sale per day
router.post('/StaffDaySearch', function(req, res,next){

  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
    const  Staff = []
    
    let DateToday = new Date(req.body.search)
    
    assert.equal(null, err);
    console.log('sucessesfully connected');
    let db = client.db('scarhealth');
    let myObj =  [
      {$match: { Hospital_UserName: req.user.UserName, Current_Date: DateToday} },
    {$group: {_id: "$Name", total: {$sum: "$Total"}}}
    ]
    
    db.collection('pharmbills').aggregate(myObj).toArray(function(error,sums){
      sums.forEach(function(sum){
                  Staff.push(sum)    
         },function(){
          client.close
         })
         console.log(Staff);
         console.log(DateToday)
         
         res.render('staffsearch', { StaffSale: Staff, date: req.body.search})
         
        });
  }) ;

});

//Handle for Staff sale per month
router.post('/StaffMonthSearch', function(req, res,next){

  Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
    const  Staff = []
    
    let DateToday = req.body.search
    
    assert.equal(null, err);
    console.log('sucessesfully connected');
    let db = client.db('scarhealth');
    let myObj =  [
      {$match: { Hospital_UserName: req.user.UserName, Month: DateToday} },
    {$group: {_id: "$Name", total: {$sum: "$Total"}}}
    ]
    
    db.collection('pharmbills').aggregate(myObj).toArray(function(error,sums){
      sums.forEach(function(sum){
                  Staff.push(sum)    
         },function(){
          client.close
         })
         console.log(Staff);
         console.log(DateToday)
         
         res.render('staffsearch', { StaffSale: Staff, date: req.body.search})
         
        });
  }) ;

});

module.exports = router;