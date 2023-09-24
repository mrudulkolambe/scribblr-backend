const bcrypt = require("bcryptjs")
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (user) {
			return res.json({
				error: true,
				message: "Username already exist!"
			})
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(req.body.password, salt);
			const user = new User({ ...req.body, password: hashedPassword });
			await user.save();
			return res.json({
				error: false,
				message: "Account Created Successfully!"
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: "Something went wrong!"
		})
	}
}

const signInUser = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			return res.json({
				error: true,
				message: "User not found!"
			})
		} else {
			const isAuthed = await bcrypt.compare(req.body.password, user.password);
			if (isAuthed) {
				const token = await jwt.sign({
					_id: user._id,
					role: "user"
				}, process.env.JWT_SECRET);
				return res.json({
					error: false,
					message: "Logged In Successfully!",
					token: token
				})
			} else {
				return res.json({
					error: true,
					message: "Invalid Credentials!"
				})
			}
		}
	} catch (error) {
		return res.json({
			error: true,
			message: "Something went wrong!"
		})
	}
}

module.exports = { createUser, signInUser };