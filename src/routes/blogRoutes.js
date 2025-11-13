const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// Get All Blogs
router
  .route("/")
  .get(blogController.fetchAllBlogs)
  .post(blogController.createNewBlog);

router
  .route("/:id")
  .get(blogController.fetchSingleBlog)
  .delete(blogController.deleteBlog)
  .patch(blogController.updateBlog);

module.exports = router;
