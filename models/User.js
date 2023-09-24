const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		default: ""
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
		default: ""
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
		default: ""
	},
	whatsapp: {
		type: String,
		default: ""
	},
	facebook: {
		type: String,
		default: ""
	},
	instagram: {
		type: String,
		default: ""
	},
	twitter: {
		type: String,
		default: ""
	},
	website: {
		type: String,
		default: ""
	},
	joined: {
		type: Number,
		default: Date.now()
	}
}, {timestamps: true});

module.exports = mongoose.model("users", UserSchema);