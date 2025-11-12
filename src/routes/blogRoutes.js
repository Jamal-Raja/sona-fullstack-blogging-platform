const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// Get All Blogs
router
  .route("/")
  .get(blogController.fetchAllBlogs)
  .put(blogController.createNewBlog);

router.route("/:id");

module.exports = router;
