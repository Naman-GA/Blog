const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./userModel");

const Blog = sequelize.define(
  "Blog",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Blog.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Blog, { foreignKey: "userId" });

Blog.sync()
  .then(() => {
    console.log("Blog model synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing Blog model:", error);
  });

module.exports = Blog;
