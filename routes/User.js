const express = require("express");
const { signInUser, createUser, userProfile } = require("../controllers/User");
const VerifyUserToken = require("../middlewares/User");
const router = express.Router();

router.post("/create", createUser);

router.post("/signin", signInUser);

router.post("/profile", VerifyUserToken, userProfile);

module.exports = router