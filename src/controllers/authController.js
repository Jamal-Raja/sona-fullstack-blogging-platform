const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/upgradedError");

/**
 * verifyUserCredentials
 *
 * Validates a user's email and password.
 * Returns the user record (including password) if authentication succeeds.
 */
exports.verifyUserCredentials = async (email, password) => {
  const errorMessage = "Incorrect email or password";

  // Fetch user with password included (default scope excludes it)
  const user = await User.scope("withPassword").findOne({ where: { email } });

  if (!user) {
    throw new AppError(errorMessage, 401);
  }

  // Compare provided password with stored hashed password
  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new AppError(errorMessage, 401);
  }

  return user; // Authentication successful
};
