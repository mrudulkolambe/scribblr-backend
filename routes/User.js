const express = require("express");
const { signInUser, createUser } = require("../controllers/User");
const router = express.Router();

router.post("/create", createUser);

router.post("/signin", signInUser);

module.exports = router