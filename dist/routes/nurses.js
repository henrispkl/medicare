"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _nurse = _interopRequireDefault(require("../models/nurse"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // Get all nurses

router.get('/', function (req, res) {
  _nurse["default"].find().sort({
    name: 'asc'
  }).then(function (nurses) {
    return res.json(nurses);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // Add a nurse

router.post('/add', _auth["default"], function (req, res) {
  var nurse = new _nurse["default"]({
    name: req.body.name,
    country: req.body.country,
    company: req.body.company
  });
  nurse.save().then(function () {
    return res.json('Nurse created!');
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // Delete a nurse

router["delete"]('/:id', _auth["default"], function (req, res) {
  _nurse["default"].findByIdAndDelete(req.params.id).then(function () {
    return res.json('Nurse deleted!');
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // Edit a nurse

router.post('/update/:id', _auth["default"], function (req, res) {
  _nurse["default"].findById(req.params.id).then(function (nurse) {
    nurse.name = req.body.name;
    nurse.country = req.body.country;
    nurse.company = req.body.company;
    nurse.save().then(function () {
      return res.json('Nurse updated!');
    })["catch"](function (err) {
      return res.status(400).json(err);
    });
  });
});
var _default = router;
exports["default"] = _default;