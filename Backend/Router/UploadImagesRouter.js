const express = require("express");
const {
   uploadImages
} = require("../Controller/UploadImagesController.js");
const { isAuthenticatedUser, authorizedRoles } = require("../Middleware/auth");

const router = express.Router();

// Admin routes
//Products images carousel Routes
router
   .route("/admin/upload/images")
   .post(isAuthenticatedUser, authorizedRoles("admin"), uploadImages);


module.exports = router;
