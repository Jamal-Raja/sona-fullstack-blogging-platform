// === SEED FILE TO POPULATE DATABASE WITH INITIAL DATA ===
// Run this file using the command: node src/seeds/seed.js

const sequelize = require("../config/connection");

const { User, Blog } = require("../models");

const blogData = require("./blogs.json");
const userData = require("./users.json");

const seedDB = async () => {
  try {
    // Sync database and clear existing data
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, { individualHooks: true });
    await Blog.bulkCreate(blogData, { individualHooks: true });

    console.log(
      "\n\x1b[1m\x1b[42m\x1b[30m =====  Database seeded successfully!  ===== \x1b[0m\n"
    );

    process.exit(0); // Exit the process successfully
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit the process with an error
  }
};

seedDB();
