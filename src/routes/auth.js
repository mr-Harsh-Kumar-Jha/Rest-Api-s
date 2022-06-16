const express = require('express')
const bcrypt = require('bcryptjs')
const router = new express.Router()
const User = require('../models/user')

// Registering a user
router.post('/register', async (req, res) => {
    const user = new User(req.body);

    try{
        user.password = await bcrypt.hash(user.password, 8);
        await user.save();
        res.status(201).send(user);
    }
    catch(e){
        res.status(400).send(e);
    }



})

module.exports = router;