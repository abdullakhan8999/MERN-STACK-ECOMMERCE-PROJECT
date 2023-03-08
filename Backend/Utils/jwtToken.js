//Create a new token and save in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  ///Option for cookie 24h 60min 60sec 1000milSec
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  //response
  res.status(statusCode).cookie("token", token, options).json({
    status: "success",
    token,
    user,
  });
};

module.exports = sendToken;
