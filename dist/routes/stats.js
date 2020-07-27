"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _job = _interopRequireDefault(require("../models/job"));

var _doctor = _interopRequireDefault(require("../models/doctor"));

var _nurse = _interopRequireDefault(require("../models/nurse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // Get number of jobs

router.get('/jobs', function (req, res) {
  _job["default"].countDocuments({}, function (err, count) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json({
        count: count
      });
    }
  });
}); // Get number of professionals

router.get('/professionals', function (req, res) {
  var number = 0;

  _doctor["default"].countDocuments({}, function (err, count) {
    if (err) {
      res.status(400).json(err);
    } else {
      number += count;

      _nurse["default"].countDocuments({}, function (err2, count2) {
        if (err2) {
          res.status(400).json(err2);
        } else {
          number += count2;
          res.json({
            count: number
          });
        }
      });
    }
  });
});
var _default = router;
exports["default"] = _default;