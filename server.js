require("dotenv").config({ quiet: true });

const sequelize = require("./src/config/connection.js");

const express = require("express");
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

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
    console.error("DB connection error -> ", err.message);
    console.error("DB connection error -> ", err);
    process.exit(1); // Abort start-up due to connection issue
  }
};

runServer();
