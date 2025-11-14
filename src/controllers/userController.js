const jwt = require("jsonwebtoken");
const AppError = require("../utils/upgradedError");
const { User } = require("../models");
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
    message: "Users registered successfully!",
    data: newUser,
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

exports.fetchUserBlogs = async (req, res, next) => {
  res.status(200).json({
    message: "here are all the blogs for this user...",
  });
};
// // FETCH SINGLE BLOG
// exports.fetchSingleBlog = async (req, res, next) => {
//   const { id } = req.params;
//   const blog = await Blog.findByPk(id);
//   // Check if blog exists
//   if (!blog) {
//     return next(new AppError(`No blog found with ID ${id}`, 404));
//   }

//   return res.status(200).json({
//     status: "Success",
//     message: "Blog retrieved successfully!",
//     data: blog,
//   });
// };
// // DELETE BLOG
// exports.deleteBlog = async (req, res, next) => {
//   const { id } = req.params;
//   // Check if valid request
//   if (!id || isNaN(id)) {
//     return next(
//       new AppError(
//         !id ? "A blog ID is required." : "Blog ID must be a number."
//       ),
//       400
//     );
//   }
//   // Delete blog from DB
//   const deletedBlog = await Blog.destroy({
//     where: {
//       blog_id: id,
//     },
//   });
//   // Check if blog was found and deleted
//   if (deletedBlog === 0) {
//     return next(new AppError(`No blog found with ID ${id}`), 404);
//   }

//   return res.status(200).json({
//     status: "Success",
//     message: "Blog deleted successfully!",
//     deleted_blog_with_id: id,
//   });
// };
// // UPDATE BLOG
// exports.updateBlog = async (req, res, next) => {
//   const { id } = req.params;
//   // Check if valid request
//   if (!id || isNaN(id)) {
//     return next(
//       new AppError(
//         !id ? "A blog ID is required." : "Blog ID must be a number.",
//         400
//       )
//     );
//   }
//   // Check if blog exists
//   const blog = await Blog.findByPk(id);
//   if (!blog) {
//     return next(new AppError(`No blog found with ID ${id}`, 404));
//   }
//   if (req.body.category && !allowedCategories.includes(req.body.category)) {
//     return next(
//       new AppError(
//         `Invalid category. Allowed categories: ${allowedCategories.join(", ")}`,
//         400
//       )
//     );
//   }
//   // Update blog in DB
//   await Blog.update(req.body, {
//     where: {
//       blog_id: id,
//     },
//   });
//   return res.status(201).json({
//     status: "Success",
//     message: "Blog updated successfully!",
//     data: blog,
//   });
// };
