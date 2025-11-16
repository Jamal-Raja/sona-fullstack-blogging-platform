const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { authenticateToken } = require("../middleware/authenticateToken");
const { verifyOwnership } = require("../middleware/verifyOwnership");

// === BLOG ROUTES ===
router
  .route("/")
  .get(blogController.fetchAllBlogs) // get all blogs with optional filtering
  .post(authenticateToken, verifyOwnership, blogController.createNewBlog); // create new blog (Protected route - requires bearer valid bearer token)

router
  .route("/:id") // get, delete or update single blog by id
  .get(blogController.fetchSingleBlog)
  .delete(authenticateToken, verifyOwnership, blogController.deleteBlog)
  .patch(authenticateToken, verifyOwnership, blogController.updateBlog);

module.exports = router;
