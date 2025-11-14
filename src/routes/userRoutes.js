const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authenticateToken");
const { verifyOwnership } = require("../middleware/verifyOwnership");

// === USER ROUTES ===
// Public
router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/").get(userController.fetchAllUsers);

// Private (user must be logged in)
router
  .route("/:id")
  .get(authenticateToken, verifyOwnership, userController.fetchUserBlogs)
  .delete(authenticateToken, verifyOwnership, userController.deleteUser);

module.exports = router;
