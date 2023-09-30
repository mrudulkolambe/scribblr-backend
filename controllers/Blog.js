const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
	try {
		const blog = new Blog({ ...req.body, user: req.user._id });
		const savedBlog = await blog.save();
		return res.json({
			error: true,
			message: "Blog Created Successfully!",
			blog: savedBlog
		})
	} catch (error) {
		return res.json({
			error: true,
			message: "Something went wrong!"
		})
	}
}

const getAllBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find({}).populate('topic').populate("user", { password: 0, });
		if (!blogs) {
			return res.json({
				error: true,
				message: "Something went wrong",
				blogs: []
			})
		} else {
			return res.json({
				error: false,
				message: "Blogs fetched Successfully!",
				blogs: blogs
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: "Something went wrong",
			blogs: []
		})
	}
}

module.exports = { createBlog, getAllBlogs };