const UploadImages = require("../Models/ImagesModel");
// const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");

//upload Images --Admin only
exports.uploadImages = catchAsyncError(async (req, res, next) => {
   req.body.user = req.user.id;
   const imageDetails = await UploadImages.create(req.body);
   res.status(201).json({
      status: "success",
      imageDetails,
   });
   next()
});