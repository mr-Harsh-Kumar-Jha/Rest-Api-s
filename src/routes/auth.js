const express = require('express')
const router = new express.Router()
const User = require('../models/user')

// Registering a user
router.post('/register', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        res.status(201).send(user);
    }
    catch(e){
        res.status(400).send();
    }



})

module.exports = router;