var express = require("express");
var router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { check } = require('express-validator');

router.post("/signup", [
	check("email", "Please provide the correct email address").isEmail(),
	check("name", "Please provide a genuine name").isLength({ min: 5 }),
	check("password", "Password length should be more than 8 characters").isLength({ min: 8 })
],signup);

router.post("/signin",[
	check("email", "Please provide the correct email address").isEmail(),
] ,signin);

router.get("/signout", signout);

router.get("/test", isSignedIn, function(req, res){
	res.json({
		user: req.auth,
		message: "User signed in!!"
	})
});

module.exports = router;
