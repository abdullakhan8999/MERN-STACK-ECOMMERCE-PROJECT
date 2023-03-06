const express = require("express");
const { createUser } = require("../Controller/UserController");

const router = express.Router();

router.route("/register").post(createUser);

module.exports = router;
