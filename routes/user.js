const User = require("../models/user");
const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, getUser, getUsers } = require("../controllers/user");

router.param("id", getUserById);
router.get("/user/:id",isSignedIn,getUser);
router.get("/users", getUsers);
module.exports = router;