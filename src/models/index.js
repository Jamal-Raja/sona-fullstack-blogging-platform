const Blog = require("../models/blogModel");
const User = require("../models/userModel");

User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Blog };
