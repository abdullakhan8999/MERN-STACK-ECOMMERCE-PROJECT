const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  UpdateUserPassword,
  UpdateUserDetails,
  getAllUsersDetails,
  getSingleUser,
  UpdateUserRole,
  deleteUser,
} = require("../Controller/UserController");
const { isAuthenticatedUser, authorizedRoles } = require("../Middleware/auth");

const router = express.Router();

//Create user Router
router.route("/register").post(createUser);

//Login User Router
router.route("/login").post(loginUser);

//Logout User Router
router.route("/logout").get(logoutUser);

//Get User details Router
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//Forget Password Router
router.route("/password/forgot").post(forgotPassword);

//Reset Password Router
router.route("/password/reset/:token").put(resetPassword);

//update user password
router.route("/password/update").post(isAuthenticatedUser, UpdateUserPassword);

//update user Details
router.route("/me/update").post(isAuthenticatedUser, UpdateUserDetails);

//admin get all users
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsersDetails);

//admin get single user
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizedRoles("admin"), UpdateUserRole)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

module.exports = router;
