const AppError = require("../utils/upgradedError");
const { Blog, User } = require("../models");
const { fn, col, where } = require("sequelize");

const allowedCategories = [
  "creativity",
  "mindset",
  "wellbeing",
  "reflection",
  "journeys",
  "culture",
].map((category) => category.toLowerCase());

// ===== BLOG CONTROLLERS ======
// FETCH ALL BLOGS
exports.fetchAllBlogs = async (req, res, next) => {
  const rawFilter = req.query.filter || "";
  const filter = rawFilter.trim().toLowerCase();

  if (filter && !allowedCategories.includes(filter)) {
    return next(
      new AppError(
        `Invalid filter category. Allowed categories: ${allowedCategories.join(
          ", "
        )}`
      )
    );
  }

  const allBlogs = !filter
    ? await Blog.findAll({
        include: [
          {
            model: User,
            attributes: ["name"], // only return the name
          },
        ],
        attributes: [
          "blog_id",
          "category",
          "title",
          "content",
          "createdAt",
          "updatedAt",
        ],
      })
    : await Blog.findAll({
        where: where(fn("LOWER", col("category")), filter),
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
        attributes: [
          "blog_id",
          "category",
          "title",
          "content",
          "createdAt",
          "updatedAt",
        ],
      });

  return res.status(200).json({
    status: "Success",
    message: "Blogs retrieved successfully!",
    results: allBlogs.length,
    filteredBy: rawFilter || null,
    data: allBlogs,
  });
};

// CREATE NEW BLOG
exports.createNewBlog = async (req, res, next) => {
  const { category, title, content, user_id } = req.body;
  // Check if valid request
  if (!category || !title || !content || !user_id) {
    return next(
      new AppError(
        "All fields (category, title, content, user_id) are required.",
        400
      )
    );
  }
  // IF CATEGORY PROVIDED BY USER IS INVALID --> THROW ERROR
  if (!allowedCategories.includes(category.toLowerCase())) {
    return next(
      new AppError(
        `Invalid category. Allowed categories: ${allowedCategories.join(", ")}`,
        400
      )
    );
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
};
// FETCH SINGLE BLOG
exports.fetchSingleBlog = async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  });
  // Check if blog exists
  if (!blog) {
    return next(new AppError(`No blog found with ID ${id}`, 404));
  }

  return res.status(200).json({
    status: "Success",
    message: "Blog retrieved successfully!",
    data: blog,
  });
};
// DELETE BLOG
exports.deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  // Check if valid request
  if (!id || isNaN(id)) {
    return next(
      new AppError(
        !id ? "A blog ID is required." : "Blog ID must be a number."
      ),
      400
    );
  }
  // Delete blog from DB
  const deletedBlog = await Blog.destroy({
    where: {
      blog_id: id,
    },
  });
  // Check if blog was found and deleted
  if (deletedBlog === 0) {
    return next(new AppError(`No blog found with ID ${id}`), 404);
  }

  return res.status(200).json({
    status: "Success",
    message: "Blog deleted successfully!",
    deleted_blog_with_id: id,
  });
};
// UPDATE BLOG
exports.updateBlog = async (req, res, next) => {
  const { id } = req.params;
  // Check if valid request
  if (!id || isNaN(id)) {
    return next(
      new AppError(
        !id ? "A blog ID is required." : "Blog ID must be a number.",
        400
      )
    );
  }
  // Check if blog exists
  const blog = await Blog.findByPk(id);
  if (!blog) {
    return next(new AppError(`No blog found with ID ${id}`, 404));
  }
  if (
    req.body.category &&
    !allowedCategories.includes(req.body.category.toLowerCase())
  ) {
    return next(
      new AppError(
        `Invalid category. Allowed categories: ${allowedCategories.join(", ")}`,
        400
      )
    );
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
};
