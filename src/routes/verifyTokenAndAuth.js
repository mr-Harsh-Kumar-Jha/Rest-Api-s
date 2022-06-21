const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
	try {
		// receving the current token from user from which they will be able to access
		// other private routes
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({
			_id: decoded._id,
			"tokens.token": token,
		});
		if (!user) throw new Error();
		req.user = user;
		req.token = token;
		next();
	} catch (e) {
		res.status(401).send({ error: "please authenticate" });
	}
};

module.exports = auth;
