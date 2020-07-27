"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../models/user"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var router = (0, _express.Router)(); // Register a new user

router.post('/register', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password; // Simple validation

  if (!name || !email || !password) {
    return res.status(400).json({
      msg: 'Please enter all fields'
    });
  }

  _user["default"].findOne({
    email: email
  }).then(function (user) {
    // If there's a user already, send error
    if (user) {
      return res.status(400).json({
        msg: 'User already exists'
      });
    }

    var newUser = new _user["default"]({
      name: name,
      email: email,
      password: password
    }); // Create salt and hash

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          throw err;
        } // Set hash password


        newUser.password = hash; // Save user in db

        newUser.save().then(function (user) {
          // Set the json web token
          jwt.sign({
            id: user.id
          }, process.env.JWT_SECRET, {
            expiresIn: 3600
          }, function (err, token) {
            if (err) {
              throw err;
            }

            res.json({
              token: token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          });
        });
      });
    });
  });
}); // Login a user

router.post('/login', function (req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password; // Simple validation

  if (!email || !password) {
    return res.status(400).json({
      msg: 'Please enter all fields'
    });
  }

  _user["default"].findOne({
    email: email
  }).then(function (user) {
    // If there's not an user, send error
    if (!user) {
      return res.status(400).json({
        msg: 'This user does not exist'
      });
    } // Validate password


    bcrypt.compare(password, user.password).then(function (isMatch) {
      // If password does not match
      if (!isMatch) {
        return res.status(400).json({
          msg: 'Invalid password'
        });
      }

      jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET, {
        expiresIn: 3600
      }, function (err, token) {
        if (err) {
          throw err;
        }

        res.json({
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      });
    });
  });
}); // Auth a user

router.get('/auth', _auth["default"], function (req, res) {
  _user["default"].findById(req.user.id).select('-password').then(function (user) {
    return res.json(user);
  });
});
var _default = router;
exports["default"] = _default;