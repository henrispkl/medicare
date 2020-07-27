"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _doctor = _interopRequireDefault(require("../models/doctor"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // Get all doctors

router.get('/', function (req, res) {
  _doctor["default"].find().sort({
    name: 'asc'
  }).then(function (doctors) {
    return res.json(doctors);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // Add a doctor

router.post('/add', _auth["default"], function (req, res) {
  var doctor = new _doctor["default"]({
    name: req.body.name,
    country: req.body.country,
    company: req.body.company
  });
  doctor.save().then(function () {
    return res.json('Doctor created!');
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // Delete a doctor

router["delete"]('/:id', _auth["default"], function (req, res) {
  _doctor["default"].findByIdAndDelete(req.params.id).then(function () {
    return res.json('Doctor deleted!');
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // Edit a doctor

router.post('/update/:id', _auth["default"], function (req, res) {
  _doctor["default"].findById(req.params.id).then(function (doctor) {
    doctor.name = req.body.name;
    doctor.country = req.body.country;
    doctor.company = req.body.company;
    doctor.save().then(function () {
      return res.json('Doctor updated!');
    })["catch"](function (err) {
      return res.status(400).json(err);
    });
  });
});
var _default = router;
exports["default"] = _default;