const express = require("express");
const router =  express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("validator");
const isEmpty = require("is-empty");
const keys = require("../../config/keys");

const User = require ("../../models/User");
const Chat = require ("../../models/Chat");
const Board = require ("../../models/Board");
const List = require ("../../models/List");

router.post("/createboard", (req, res) => {
    const newBoard = new Board({
        name: req.body.name        
      });
    newBoard.save(function(err,board){
        console.log(board.id);
        var obj = {
          name: req.body.name,
          boardid: board.id,
          accepted: true
        }
        User.findOneAndUpdate({_id: req.body.userid} , {$addToSet: {boards: obj} } ).then(user => {
          if(user){
          }
        });
    });
  });

  router.post("/createlist", (req, res) => {
    const newList = new List({
        name: req.body.name        
      });
    newList.save(function(err,list){
        console.log(list.id);
        var obj = {
          name: req.body.name,
          listid: list.id,
          state: 1,
        }
        Board.findOneAndUpdate({_id: req.body.boardid} , {$addToSet: {list: obj} } ).then(user => {
          if(user){
            
          }
        });
    });
  });


  router.post("/createtask", (req, res) => {
    const newTask = {
        name: req.body.name,   
        completed: false     
      }
        List.findOneAndUpdate({_id: req.body.listid} , {$addToSet: {task: newTask} } ).then(user => {
          if(user){
            
          }
        });
  });

  router.get('/getboards', function(req, res){
    console.log("hey");
    User.find({}).then(docs => {
      res.send(docs);
      console.log(docs);
    })
    
  });
  router.get('/getlist', function(req, res){
    Board.find({}).then(docs => {
      res.send(docs);
     
    })
  });
  router.get('/gettask', function(req, res){
    List.find({}).then(docs => {
      res.send(docs);
    })
  });
  router.get('/getchat', function(req, res){
    Chat.find({}).then(docs => {
      res.send(docs);
    })
  });
  router.post('/acceptinvite', function(req, res){
    User.update(
      { _id: req.body.id, 
        boards: 
            { $elemMatch: { boardid: req.body.boardid }}
      },
      { $set: 
            { 'boards.$.accepted' : true 
      }
   },(error,result)=>{
      if(error){  
         //handle error
      }
      console.log(result);
    } 
    )
});
router.post('/changestate', function(req, res){
  Board.update(
    { _id: req.body.boardid, 
      list: 
          { $elemMatch: { listid: req.body.listid }}
    },
    { $set: 
          { 'list.$.state' : req.body.index 
    }
 },(error,result)=>{
    if(error){  
       //handle error
    }
    console.log(result);
  } 
  )
  
});

router.post("/createboard", (req, res) => {
  const newBoard = new Board({
      name: req.body.name        
    });
  newBoard.save(function(err,board){
      console.log(board.id);
      var obj = {
        name: req.body.name,
        boardid: board.id,
        accepted: true
      }
      User.findOneAndUpdate({_id: req.body.userid} , {$addToSet: {boards: obj} } ).then(user => {
        if(user){
        }
      });
  });
});


router.post("/invitemember", (req, res) => {

      var obj = {
        name: req.body.boardname,
        boardid: req.body.boardid,
        accepted: false
      }
      console.log(obj);
      User.findOneAndUpdate({email: req.body.email} , {$addToSet: {boards: obj} } ).then(user => {
        if(user){
        }
      
  });
});

  module.exports = router;