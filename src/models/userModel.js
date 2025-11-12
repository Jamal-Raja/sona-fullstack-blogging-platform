const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Name is required",
      },
      len: {
        args: [1, 69],
        msg: "Please ensure name is between 1 and 70 characters long.",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "Email field is required",
      },
      isEmail: {
        msg: "Please enter a valid email.",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Please enter a password.",
      },
      len: {
        args: [8],
        msg: "Password must be at least 8 characters long.",
      },
    },
  },
});

module.exports = User;
