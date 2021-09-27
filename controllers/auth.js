const User = require("../models/User");

const ErrorResponse = require("../middleware/error");

//REGISTER

exports.register =
  ("/",
  async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
      sentToken(user, 201, res);
    } catch (error) {
      next(error);
    }
  });

//LOGIN

exports.login =
  ("/",
  async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("Please provide the password", 402));
    }

    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        res.status(404).json({
          success: false,
          error: "invalid Credentials",
        });
      }
      const isMatch = await user.matchPasswords(password);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          error: "Invalid Credentials",
        });
      }

      sentToken(user, 201, res);
    } catch (error) {
      res.status(501).json({
        success: false,
        error: error.message,
      });
    }
  });

const sentToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(200).json({
    success: true,
    jwttoken: token,
  });
};
