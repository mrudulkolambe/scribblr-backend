const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	photoURL: {
		type: String,
	},
	followers: {
		type: [mongoose.SchemaTypes.ObjectId],
		default: [],
	},
	following: {
		type: [mongoose.SchemaTypes.ObjectId],
		default: [],
	},
	description: {
		type: String,
	},
	whatsapp: {
		type: String,
	},
	facebook: {
		type: String,
	},
	instagram: {
		type: String,
	},
	twitter: {
		type: String,
	},
	website: {
		type: String,
	},
	joined: {
		type: Number,
		default: Date.now()
	}
}, {timestamps: true});

module.exports = mongoose.model("users", UserSchema);