const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define("user", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync()
  .then(() => {
    console.log("User model synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing User model:", error);
  });

module.exports = User;
