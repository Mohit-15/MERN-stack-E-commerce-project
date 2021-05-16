const express = require("express");
const router = express.Router()

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getCategoryById, createCategory, getAllCategories, 
		getCategory, updateCategory, deleteCategory } = require("../controllers/category");
const { getUserById } = require("../controllers/user");

router.param("id", getUserById);
router.param("categoryId", getCategoryById);

router.post("/category/create/:id", isSignedIn, isAuthenticated, isAdmin, createCategory);
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

router.put("/category/:categoryId/:id", isSignedIn, isAuthenticated, isAdmin, updateCategory);
router.delete("/category/:categoryId/:id", isSignedIn, isAuthenticated, isAdmin, deleteCategory);

module.exports = router