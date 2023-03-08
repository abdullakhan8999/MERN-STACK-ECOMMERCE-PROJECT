const express = require("express");
const {
  createUser,
  getUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../Controller/UserController");

const router = express.Router();

//Create user Router
router.route("/register").post(createUser);

//Login User Router
router.route("/login").post(loginUser);

//Logout User Router
router.route("/logout").get(logoutUser);

//Get User details Router
router.route("/user/:id").get(getUser);

//Forget Password Router
router.route("/password/forgot").post(forgotPassword);

//Reset Password Router
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
