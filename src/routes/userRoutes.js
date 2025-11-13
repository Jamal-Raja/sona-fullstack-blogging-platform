const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/").get(userController.fetchAllUsers);

router.route("/register").post(userController.registerUser);

// router.route("/:id").delete();

module.exports = router;
