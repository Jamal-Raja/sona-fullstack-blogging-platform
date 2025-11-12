const sequelize = require("../config/connection");

const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const blogData = require("./blogs.json");
const userData = require("./users.json");

const seedDB = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData);
    await Blog.bulkCreate(blogData);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error(error);
  }
};

seedDB();
// === COMMAND TO SEED DB ===
// node src/seeds/seed.js
