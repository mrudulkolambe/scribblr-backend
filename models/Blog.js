const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "users",
		required: true,
	},
	topic: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "topic",
		required: true,
	},
	photoURL: {
		type: String,
	},
	timestamp: {
		type: Number,
		default: Date.now()
	}
}, {timestamps: true});

module.exports = mongoose.model("blog", BlogSchema);