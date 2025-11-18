const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Blog = sequelize.define("Blog", {
  blog_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM(
      "creativity",
      "mindset",
      "wellbeing",
      "reflection",
      "journeys",
      "culture"
    ),
    allowNull: false,
    validate: {
      notNull: { msg: "Category is required" },
      isIn: {
        args: [
          [
            "creativity",
            "mindset",
            "wellbeing",
            "reflection",
            "journeys",
            "culture",
          ],
        ],
        msg: "Category must be one of the predefined options.",
      },
    },
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
        msg: "Please ensure title is between 5 and 69 characters long",
      },
    },
  },
  content: {
    type: DataTypes.TEXT,
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
