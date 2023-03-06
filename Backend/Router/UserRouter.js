const express = require("express");
const { createUser, getUser } = require("../Controller/UserController");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/user/:id").get(getUser);

module.exports = router;
