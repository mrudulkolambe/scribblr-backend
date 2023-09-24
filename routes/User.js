const express = require("express");
const { signInUser, createUser, userProfile, updateProfile } = require("../controllers/User");
const VerifyUserToken = require("../middlewares/User");
const router = express.Router();

router.post("/create", createUser);

router.post("/signin", signInUser);

router.get("/profile", VerifyUserToken, userProfile);

router.patch("/update", VerifyUserToken, updateProfile);

module.exports = router