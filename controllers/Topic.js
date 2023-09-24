const Topic = require("../models/Topic");

const createTopic = async (req, res) => {
	try {
		const topic = new Topic(req.body);
		const savedTopic = await topic.save();
		return res.json({
			error: true,
			message: "Topic Created Successfully!",
			topic: savedTopic
		})
	} catch (error) {
		return res.json({
			error: true,
			message: "Something went wrong!"
		})
	}
}

const getTopics = async (req, res) => {
	try {
		const topics = await Topic.find();
		if (!topics) {
			return res.json({
				error: true,
				message: "Something went wrong!"
			})
		} else {
			return res.json({
				error: true,
				message: "Topics fetched successfully!",
				topic: topics
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: "Something went wrong!"
		})
	}
}

module.exports = { createTopic, getTopics };