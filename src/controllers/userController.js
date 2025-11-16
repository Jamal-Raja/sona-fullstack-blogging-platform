const jwt = require("jsonwebtoken");
const AppError = require("../utils/upgradedError");
const { User, Blog } = require("../models");
const bcrypt = require("bcryptjs");
const { fn, col, where } = require("sequelize");
const { verifyUserCredentials } = require("./authController");

// ===== USER CONTROLLERS ======
// FETCH ALL USERS
exports.fetchAllUsers = async (req, res, next) => {
  const allUsers = await User.findAll();

  return res.status(200).json({
    status: "Success",
    message: "Users retrieved successfully!",
    results: allUsers.length,
    data: allUsers,
  });
};
// REGISTER NEW USER
exports.registerUser = async (req, res, next) => {
  const { name, email, password, passwordConfirmation } = req.body;
  // Check if valid request
  if (!name || !email || !password || !passwordConfirmation) {
    return next(
      new AppError("All fields (name, email and password) are required.", 400)
    );
  }
  // Throw error if user is already registered
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return next(new AppError("This email is already registered", 400));
  }

  // Create new user in DB
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirmation,
  });

  return res.status(200).json({
    status: "Success",
    message: `${name} registered successfully!`,
  });
};
// USER LOGIN
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Authenticate user credentials
    const user = await verifyUserCredentials(email, password);
    // Generate JWT payload
    const payload = {
      user_id: user.user_id,
      email: user.email,
      name: user.name,
    };
    // Generate access token
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    res.status(200).json({
      status: "Success",
      message: "User logged in successfully!",
      accessToken,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
};
// DELETE USER
exports.deleteUser = async (req, res, next) => {
  const { user_id } = req.user;
  console.log(user_id);
  // Throw error if user is already deleted
  const userExists = await User.findOne({ where: { user_id } });
  if (!userExists) {
    return next(new AppError("This account is no longer registered.", 400));
  }
  // Delete user from DB
  User.destroy({
    where: {
      user_id: user_id,
    },
  });

  res.status(200).json({
    status: "success",
    message: "User deleted successfully!",
  });
};
// FETCH USERS BLOGS
exports.fetchUserBlogs = async (req, res, next) => {
  const { id } = req.params;
  // Get user info
  const { dataValues: user } = await User.findByPk(id);
  // Get user's blogs
  const usersBlogs = await Blog.findAll({
    where: {
      user_id: id,
    },
  });

  res.status(200).json({
    status: "Success",
    message: `Here are all of ${user.name}'s blogs...`,
    results: usersBlogs.length || 0,
    data: usersBlogs,
  });
};
