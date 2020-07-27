"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var jwt = require('jsonwebtoken');

function auth(req, res, next) {
  var token = req.header('x-auth-token'); // Check for auth token

  if (!token) {
    res.status(401).json({
      msg: 'No token, authorization denied'
    });
  }

  try {
    // Verify token
    var decoded = jwt.verify(token, process.env.JWT_SECRET); // Add user from payload

    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      msg: 'Token is not valid'
    });
  }
}

var _default = auth;
exports["default"] = _default;