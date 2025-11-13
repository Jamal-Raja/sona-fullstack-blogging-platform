const { Blog } = require("../models");

const allowedCategories = [
  "Accounting",
  "Finance",
  "Tax",
  "Strategy",
  "Leadership",
  "Technology",
  "Productivity",
];

exports.fetchAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.findAll();

    return res.status(200).json({
      status: "Success",
      message: "Blogs retrieved successfully!",
      results: allBlogs.length,
      data: allBlogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({
      status: "Error",
      message: "Failed to retrieve blogs. Please try again later.",
    });
  }
};

exports.createNewBlog = async (req, res) => {
  try {
    const { category, title, content, user_id } = req.body;
    // Check if valid request
    if (!category || !title || !content || !user_id) {
      return res.status(400).json({
        status: "Error",
        message: "All fields (category, title, content, user_id) are required.",
      });
    }
    // Create blog post and add to DB
    const newBlog = await Blog.create({
      category,
      title,
      content,
      user_id,
    });

    return res.status(201).json({
      status: "Success",
      message: "Blog created successfully!",
      data: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      status: "Error",
      message: "Failed to create new blog. Please try again later.",
    });
  }
};

exports.fetchSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    // Check if blog exists
    if (!blog) {
      return res.status(404).json({
        status: "Error",
        message: `No blog found with ID ${id}`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Blog retrieved successfully!",
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({
      status: "Error",
      message: "Failed to retrieve blog. Please try again later.",
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if valid request
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: !id ? "A blog ID is required." : "Blog ID must be a number.",
      });
    }
    // Delete blog from DB
    const deletedBlog = await Blog.destroy({
      where: {
        blog_id: id,
      },
    });
    // Check if blog was found and deleted
    if (deletedBlog === 0) {
      return res.status(404).json({
        status: "Error",
        message: `No blog found with ID ${id}`,
      });
    }
    return res.status(200).json({
      status: "Success",
      message: "Blog deleted successfully!",
      deleted_blog_with_id: id,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({
      status: "Error",
      message: "Failed to delete blog. Please try again later.",
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if valid request
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: !id ? "A blog ID is required." : "Blog ID must be a number.",
      });
    }
    // Check if blog exists
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({
        status: "Error",
        message: `No blog found with ID ${id}`,
      });
    }
    if (req.body.category && !allowedCategories.includes(req.body.category)) {
      return res.status(400).json({
        status: "Error",
        message: `Invalid category. Allowed categories: ${allowedCategories.join(
          ", "
        )}`,
      });
    }
    // Update blog in DB
    await Blog.update(req.body, {
      where: {
        blog_id: id,
      },
    });
    return res.status(201).json({
      status: "Success",
      message: "Blog updated successfully!",
      data: blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({
      status: "Error",
      message: "Failed to update blog. Please try again later.",
    });
  }
};
