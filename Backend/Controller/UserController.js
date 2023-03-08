const catchAsyncError = require("../Middleware/catchAsyncError");
const User = require("../Models/UserModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const sendToken = require("../Utils/jwtToken");
const sendEmail = require("../Utils/sendEmail");
const crypto = require("crypto");

//Register user
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

  //send status and token
  sendToken(user, 201, res);
});

//Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if user has given email, password
  if (!email || !password) {
    return next(new ErrorHandler(`Please provide email and password.`, 400));
  }

  //Find user in DB
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(`Invalid email or password.`, 404));
  }

  //Check and compare password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler(`Invalid email or password.`, 401));
  }

  //If User there then send status and token
  sendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    data: {}
  });
});

//Get user details
exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    user,
  });
});

//forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  //finding user with email
  const user = await User.findOne({ email: req.body.email });

  //User with email is not there
  if (!user) {
    return next(new ErrorHandler(`Invalid email: ${req.body.email}`, 404));
  }

  //Generate reset token
  const resetToken = await user.getResetPasswordToken();

  //save the reset token in user
  await user.save({ validateBeforeSave: false });

  //Reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  //Message to send user for reset password
  const message = `<!DOCTYPE html>
<html>

<head>
   <meta charset="utf-8" />
   <title>Password Reset Request</title>
   <style>
      body {
         font-family: Arial, sans-serif;
         font-size: 16px;
         color: #333;
         line-height: 1.5;
         margin: 0;
         padding: 0;
      }

      .body {
         display: flex;
         align-items: center;
         justify-content: center;
      }


      .container {
         max-width: 100%;
         margin: 51px auto;
         padding: 20px;
         border: 1px solid #ccc;
      }

      h2 {
         font-size: 28px;
         font-weight: normal;
         margin-bottom: 20px;
      }

      p {
         margin-bottom: 20px;
      }

      .btn {
         display: inline-block;
         padding: 10px 20px;
         background-color: #007bff;
         color: white;
         text-decoration: none;
         border-radius: 4px;
      }
       a {
         text-decoration: none;
         color: white;
      }

      .btn:hover {
         background-color: #0069d9;
      }

      @media only screen and (max-width: 600px) {
         body {
            font-size: 14px;
         }

         .container {
            padding: 10px;
         }

         h2 {
            font-size: 24px;
         }
      }
   </style>
</head>

<body class="body">
   <div class="container">
      <h2>Hi ${user.name},</h2>
      <p>
         We received a request to reset the password for your MaNaEcommerce
         account. If you did not make this request, please ignore this message.
      </p>
      <p>
         To reset your password, click the button below:
      </p>
      <p>
         <a href=${resetUrl}
            class="btn">Reset Password</a>
      </p>
      <p>
         This link is valid for the next 30 minutes. If you do not reset your
         password within this time, you will need to submit another reset
         password request.
      </p>
      <p>Thanks,</p>
      <p>The MaNaEcommerce team</p>
   </div>
</body>

</html>`;

  try {
    await sendEmail({
      email: user.email,
      subject: "MaNaEcommerce Password Recovery",
      message,
    });
    console.log(resetUrl);
    res.status(200).json({
      status: "success",
      message: `Email sent successfully to: ${user.email}`,
      resetUrl,
    });
  } catch (error) {
    //if there is error make undefined and save user
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    //showing error
    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  // Check if both password and confirmPassword are provided
  if (!password || !confirmPassword) {
    return next(
      new ErrorHandler(
        "Please provide both password and confirm password.",
        400
      )
    );
  }

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match.", 400));
  }

  // Find the user by the reset token and check if it is not expired
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid or expired token.", 400));
  }

  // Update user password and remove reset password token and expiration
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // Save the user to the database
  await user.save();

  // Send success response
  sendToken(user, 200, res);
});
