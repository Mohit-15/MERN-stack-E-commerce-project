const User = require("../models/user");
const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, categ) => {
		if(err){
			return res.status(400).json({
				error: "Category not found!"
			});
		}
		req.category = categ;
		next();
	});
};

exports.createCategory = (req, res) => {
	let category = new Category(req.body);
	category.save((err, categ) => {
		if(err){
			return res.status(403).json({
				error: "User is not authenticated and have no user Priviledges."
			});
		}
		return res.status(201).json({
			message: "Category created!",
			category: categ
		});
	});
}

exports.getAllCategories = (req, res) => {
	Category.find().exec((err, allcateg) => {
		if(err){
			return res.status(400).json({
				error: "Cannot find Categories!"
			});
		}
		return res.json(allcateg);
	})
}

exports.getCategory = (req, res) => {
	return res.json(req.category);
}

exports.updateCategory = (req, res) => {
	const category = req.category;
	category.name = req.body.name;

	category.save((err, categ) => {
		if(err){
			return res.status(400).json({
				error: "Category can't be updated"
			});
		}
		return res.status(200).json({
			message: "Category updated!"
		});
	});
}

exports.deleteCategory = (req, res) => {
	const category = req.category;
	category.remove((err, deletedCateg) => {
		if(err){
			return res.status(400).json({
				error: "Category can't be deleted"
			});
		}
		res.status(200).json({
			message: "Category Successfully deleted!"
		});
	});
}