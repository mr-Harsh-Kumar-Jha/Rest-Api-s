const express = require("express");
const authMiddleware = require('./verifyTokenAndAuth');
const router = new express.Router();

router.get('/getuser', authMiddleware, (req, res)=>{
   try{
     const  userinfo=req.user.select("-password");
      res.send(userinfo);
   }catch(errors){
      res.status(500).send({errors:"internal server error"});
   }
})