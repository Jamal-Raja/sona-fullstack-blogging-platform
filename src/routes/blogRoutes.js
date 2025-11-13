const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// BLOG ROUTES
router
  .route("/")
  .get(blogController.fetchAllBlogs) // get all blogs with optional filtering
  .post(blogController.createNewBlog); // create new blog

router
  .route("/:id") // get, delete or update single blog by id
  .get(blogController.fetchSingleBlog)
  .delete(blogController.deleteBlog)
  .patch(blogController.updateBlog);

module.exports = router;
