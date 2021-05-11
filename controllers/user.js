const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if(err || !user){
			return res.status(400).json({
				error: "User not found"
			});
		}
		req.profile = user
		next();
	});
}

exports.getUser = (req, res) => {
	req.profile.salt = undefined;
	req.profile.encry_password = undefined;
	req.profile.createdAt = undefined;
	req.profile.updatedAt = undefined;
	return res.json(req.profile);
}

exports.getUsers = (req, res) => {
	User.find().exec((err, users) => {
		if(err || !users){
			return res.status(403).json({
				error: "Server Error"
			});
		}
		res.json(users)
	})
}

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		{_id: req.profile._id},
		{$set: req.body},
		{new: true, useFindAndModify: false},
		(err, user) => {
			if(err){
				return res.status(400).json({
					error: "User not updated!"
				});
			}
			res.json(user);
		}
	)
}

exports.orderList = (req, res) => {
	Order.find({user: req.profile._id})
	.populate("user", "_id name email")
	.exec((err, order) => {
		if(err){
			return res.status(400).json({
				error: "Order not found"
			});
		}
		return res.json(order);
	});
}
