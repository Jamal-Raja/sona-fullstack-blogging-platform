const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Blog = sequelize.define("Blog", {
  blog_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Title is required",
      },
      len: {
        args: [5, 69],
      },
    },
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "content is required",
      },
      len: {
        args: [10],
        msg: "Please ensure content contains at least 10 characters",
      },
    },
  },
  // Foreign Key to User Model
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Establishes relationship between Blog and User models
    references: {
      model: "Users",
      key: "user_id",
    },
  },
});

module.exports = Blog;
