const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, getUser, getUsers, updateUser } = require("../controllers/user");

router.param("id", getUserById);
router.get("/user/:id", isSignedIn, isAuthenticated, getUser);
router.get("/users", getUsers);

router.put("/user/:id", isSignedIn, isAuthenticated, updateUser);

module.exports = router;