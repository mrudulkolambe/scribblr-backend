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
				const data = { ...user.toObject(), id: user._id, token: token }
				delete data._id
				delete data.__v
				return res.json({
					error: false,
					message: "Logged In Successfully!",
					...data
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

const userProfile = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user._id }, { password: 0 });
		if (!user) {
			return res.json({
				error: true,
				message: "User not found!"
			})
		} else {
			delete user._id;
			return res.json({
				error: false,
				message: "Data fetched successfully!",
				user: { ...user.toObject(), id: user._id }
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: "Something went wrong!"
		})
	}
}

const updateProfile = async (req, res) => {
	try {
		const user = await User.findOneAndUpdate({ _id: req.user._id }, { ...req.body }, { returnOriginal: false });
		if (!user) {
			return res.json({
				error: true,
				message: "User not found!"
			})
		} else {
			return res.json({
				error: false,
				message: "Data updated successfully!",
				user: user
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: "Something went wrong!"
		})
	}
}

module.exports = { createUser, signInUser, userProfile, updateProfile };