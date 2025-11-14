require("dotenv").config({ quiet: true });
const sequelize = require("./src/config/connection.js");
const SequelizeErrorHandler = require("./src/middleware/sequalizeErrorHandler.js");
const GlobalErrorHandler = require("./src/middleware/globalErrorHandler.js");
const UndefinedRouteHandler = require("./src/middleware/undefinedRouteHandler.js");
const AppError = require("./src/utils/upgradedError");

const userRouter = require("./src/routes/userRoutes.js");
const blogRouter = require("./src/routes/blogRoutes.js");

const express = require("express");
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.static("public"));
// ROUTES
app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use(UndefinedRouteHandler); // HANDLE UNDEFINED ROUTES

app.use(SequelizeErrorHandler); // SEQUELIZE ERROR HANDLER
app.use(GlobalErrorHandler); // GLOBAL ERROR HANDLER

// IMPORT MODELS TO SYNC WITH DB
require("./src/models/blogModel.js");
require("./src/models/userModel.js");

// START SERVER AFTER DB CONNECTION
const runServer = async () => {
  try {
    console.log("Attempting to connect to MySQL DB...");

    await sequelize.authenticate();
    console.log(
      "\x1b[36m%s\x1b[0m",
      "MySQL connection established successfully."
    );

    await sequelize.sync();
    console.log("Models synced with DB.");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(
        "\x1b[1m\x1b[33m%s\x1b[0m",
        `Server Running on --> http://localhost:${PORT}`
      );
    });
  } catch (err) {
    // HANDLE DB CONNECTION ERRORS
    console.error("DB connection error -> ", err.message);
    process.exit(1);
  }
};

runServer();

/**
 * =======================
 * =========TO DO=========
 * =======================
 * ------ BLOGS ------
 * 1. CRUD OPERATIONS ON BLOGS ROUTE ===COMPLETO✅===
 * 2. ERROR HANDLING ON BLOG ROUTEES (E.g trying to delete blog that dont exist, or updating blog that doesnt exist should throw errror) ===COMPLETO✅===
 * 3. IMPLEMENT UNDEFINED ROUTE HANDLER ===COMPLETO✅===
 * 4. ADD FILTERING OPTION FOR ALL BLOGS ===COMPLETO✅===
 * ------ USERS ------
 * 5. CREATE USER MODEL (+POPULATE VIA .JSON SEED) ===COMPLETO✅===
 * 6. CRUD OPERATIONS ON USER ROUTE ===IN_PROGRESSO⏳===
 * 7. ERROR HANDLING ON USER ROUTEES (E.g trying to delete blog that dont exist, or updating blog that doesnt exist should throw errror)
 * ------ OTHER ------
 * 8. IMPLENT HASHED PASSWORDS ===COMPLETO✅===
 * 9. USE BYCRYPT AND JWT TO PROVIDE USER WITH A BEARER TOKEN UPON LOGIN ===COMPLETO✅===
 * 10. ENSURE ONLY LOGGED IN USER CAN EDIT/DELETE OWN POSTS
 * 11. ADD GLOBAL ERROR HANDLER (https://betterstack.com/community/guides/scaling-nodejs/error-handling-express/) ===COMPLETO✅===
 * 12. DB SEED DATA ===COMPLETO✅===
 */
