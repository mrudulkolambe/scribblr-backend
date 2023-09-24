const express = require("express");
const { getAllBlogs, createBlog } = require("../controllers/Blog");
const VerifyUserToken = require("../middlewares/User")
const router = express.Router();

router.get("/", getAllBlogs);

router.post("/create", VerifyUserToken, createBlog);

module.exports = router