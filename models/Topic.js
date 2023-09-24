const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		unique: true,
		required: true
	}
}, { timestamps: true });

module.exports = mongoose.model("topic", TopicSchema);