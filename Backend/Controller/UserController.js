const catchAsyncError = require("../Middleware/catchAsyncError");
const User = require("../Models/UserModel");

exports.createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      Public_id: "sampleId",
      url: "sampleUrl",
    },
  });

  res.status(201).json({
    status: "success",
    user,
  });
});
