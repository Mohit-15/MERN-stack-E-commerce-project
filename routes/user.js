const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, getUser, getUsers, updateUser, orderList } = require("../controllers/user");

router.param("id", getUserById);
router.get("/user/:id", isSignedIn, isAuthenticated, getUser);
router.get("/users", getUsers);

router.put("/user/:id", isSignedIn, isAuthenticated, updateUser);

router.get("/orders/user/:id", isSignedIn, isAuthenticated, orderList);

module.exports = router;