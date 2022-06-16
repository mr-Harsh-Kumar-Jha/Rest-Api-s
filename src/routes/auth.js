const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = new express.Router()
const User = require('../models/user')

// Registering a user
router.post('/register', async (req, res) => {
    const user = new User(req.body);

    try{
        user.password = await bcrypt.hash(user.password, 8);
        await user.save();
        console.log(user);
        const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
        console.log(token);
        user.tokens = user.tokens.concat({token})
        await user.save()
        res.status(201).send({user,token});
    }
    catch(e){
        res.status(400).send(e);
    }



})

module.exports = router;