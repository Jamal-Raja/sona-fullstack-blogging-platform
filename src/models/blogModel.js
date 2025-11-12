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
});

module.exports = Blog;
