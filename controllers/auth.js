require("dotenv").config();
const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const authtoken = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()
    })
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json(user);
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if(!errors.isEmpty()){
    return res.status(401).json({
      error: errors.array()
    });
  }

  User.findOne({email}, (err, user) => {
    if(err || !user){
      return res.status(400).json({
        message: "User doesn't exist!"
      });
    }

    if(!user.authenticate(password)){
      return res.status(401).json({
        message: "Password doesn't match!"
      });
    }

    var token = jwt.sign({ _id: user._id }, process.env.SECRET);

    res.cookie("token", token, { expire: new Date().getTime() + 9999 });

    return res.json({
      token, user: {
        _id: user._id,
        name: user.name,
        email: user.email
      } 
    });
  }); 
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully!"
  });
};

exports.isSignedIn = authtoken({
  secret: process.env.SECRET,
  userProperty: "auth"
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!checker){
    return res.status(403).json({
      message: "User is not authenticated!!"
    });
  }
  next();
}

exports.isAdmin = (req, res, next) => {
  if(req.profile.role == 0){
    res.json({
      message: "User have not Admin Permissions!!"
    })
  }
  next();
}
