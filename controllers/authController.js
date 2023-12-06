const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../utils/config");
const passport = require("../utils/passport");
const logger = require("../utils/logger");

exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userName: userName,
      email: email,
      password: encryptedPassword,
    });
    logger.info(`User registered: ${email}`);
    res.status(200).json({
      message: "User Registered Successfully!",
      Details: {
        Data: newUser,
      },
      success: true,
    });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    console.log(error);
    res.json({
      message: "Error Occured",
      success: false,
    });
  }
};

exports.login = function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      logger.error(`Authentication error: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      logger.warn("Invalid login attempt");
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user.id, userEmail: user.email },
      jwtSecret.jwtSecret,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login successful",
      Data: {
        meta: {
          token: token,
        },
        name: user.userName,
        email: user.email,
      },
    });
  })(req, res, next);
};
