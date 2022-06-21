const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const User = require("../models/user");
const authMiddleware = require('./verifyTokenAndAuth')

// Registering a user
router.post("/register", async (req, res) => {
	const user = new User(req.body);

	try {
		user.password = await bcrypt.hash(user.password, 8);
		await user.save();
		const token = jwt.sign(
			{ _id: user._id.toString() },
			process.env.JWT_SECRET
		);
		user.tokens = user.tokens.concat({ token });
		await user.save();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ name: req.body.name });
		if (!user) res.status(400).send({ error: "user not found" });
		else {
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if(!isMatch) res.status(404).send({error: "wrong password"});
            else{
                const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
                user.tokens = user.tokens.concat({ token });
		        await user.save();
                res.status(200).send({user, token});
            }
		}
	} catch (e) {
		res.status(500).send();
	}
});

router.post('/logout', authMiddleware, (req, res) => {
    res.send({msg: "user is authenticated"})
})

module.exports = router;
