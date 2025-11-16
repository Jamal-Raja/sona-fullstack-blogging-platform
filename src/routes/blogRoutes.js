const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { authenticateToken } = require("../middleware/authenticateToken");
const { verifyOwnership } = require("../middleware/verifyOwnership");

// === BLOG ROUTES ===
router
  .route("/") // get all blogs (with optional filtering) or create new blod
  .get(blogController.fetchAllBlogs)
  .post(authenticateToken, verifyOwnership, blogController.createNewBlog); // (Protected route - requires bearer valid bearer token)

router
  .route("/:id") // get, delete or update single blog by id
  .get(blogController.fetchSingleBlog)
  .delete(authenticateToken, verifyOwnership, blogController.deleteBlog) // (Protected route - requires bearer valid bearer token)
  .patch(authenticateToken, verifyOwnership, blogController.updateBlog); // (Protected route - requires bearer valid bearer token)

module.exports = router;
