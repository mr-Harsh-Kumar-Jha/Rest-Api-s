const express = require("express");
const authMiddleware = require('./verifyTokenAndAuth');
const router = new express.Router();

router.get('/getuser', authMiddleware, (req, res)=>{
   try{
      res.send(user);
   }catch(errors){
      res.status(500).send({errors:"internal server error"});
   }
})