const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mongoclient = require('mongodb');
const assert = require('assert');
const io = require('socket.io').listen(80).sockets;



var url = 'mongodb://localhost:27017/scarhealth';
//var url = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/scarhealth?retryWrites=true&w=majority '
/*
router.get('/InternalChats', function(req, res){
  
    res.render('chat', { Hospital: req.user.Hospital, Name: req.user.Name })   

} );

Mongoclient.connect(process.env.MONGODB_URI || url, {useUnifiedTopology: true}, function(err, client){
    assert.equal(null, err);
    console.log('sucessesfully ');
    let db = client.db('scarhealth');
    io.on('connection', function(){
      sendStatus = function(s){
          socket.emit('status',s);
      }

      //find  and get all chats in collection
      db.collection('chats').find().limit(100).sort({_id:1}).toArray(function(err, res){
          if(err){
              throw err;
          }

          //Emits the messages
          socket.emit('output', res)
      });

      //handle input 
      socket.on('input', function(data){
          let name = data.name;
          let message = data.message;
           let  inputEmail = data.inputEmail
          //check for message
          if(message == ''){
              sendStatus('Please Enter Your Message')
          }else{
              //insert message into db
              db.collection('chats').insert({name:name, inputEmail:inputEmail, message:message}, function(){
                  io.emit('ouput',[data]);

                   sendStatus({
                       message: 'message sent',
                       clear:true
                   })
              })
          }

      })

      //handle cear input
      socket.on('clear', function(data){
          //remove all chats from collection
          let query = {inputEmail: req.user.inputEmail };
          db.collection('chats').deleteMany(query, function(err, data){
              //socket emit cleared
              socket.emit('cleared')
          })
      })
    })
})
*/
module.exports = router;