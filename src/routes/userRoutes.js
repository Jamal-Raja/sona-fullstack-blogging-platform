const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authenticateToken");

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

router.route("/").get(userController.fetchAllUsers);
router.route("/:id").get(authenticateToken, userController.fetchUserBlogs).delete(authenticateToken, userController.deleteUser);

module.exports = router;
