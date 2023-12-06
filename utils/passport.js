const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel"); // Adjust the path to your user model
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: "Invalid credentials" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
