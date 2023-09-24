const express = require("express");
const { getTopics, createTopic } = require("../controllers/Topic");
const router = express.Router();

router.get("/", getTopics);

router.post("/create", createTopic);

module.exports = router