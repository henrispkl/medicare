"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _job = _interopRequireDefault(require("../models/job"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // Get all jobs

router.get('/', function (req, res) {
  _job["default"].find().sort({
    createdAt: 'desc'
  }).then(function (jobs) {
    return res.json(jobs);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // Add a job

router.post('/add', _auth["default"], function (req, res) {
  var job = new _job["default"]({
    name: req.body.name,
    jobType: req.body.jobType,
    institution: req.body.institution,
    location: req.body.location,
    dates: req.body.dates,
    workingHours: req.body.workingHours,
    workingDays: req.body.workingDays,
    contractType: req.body.contractType,
    shiftType: req.body.shiftType,
    description: req.body.description
  });

  if (req.body.name.length) {
    job.save().then(function (result) {
      return res.json({
        msg: 'Job created!',
        result: result
      });
    })["catch"](function (err) {
      return res.status(400).json(err);
    });
  }
}); // Update a job

router.post('/update', _auth["default"], function (req, res) {
  if (req.body.name.length) {
    _job["default"].findByIdAndUpdate(req.body._id, req.body, {
      useFindAndModify: false
    }).then(function (result) {
      return res.json({
        msg: 'Job updated!',
        result: result
      });
    })["catch"](function (err) {
      return res.status(400).json(err);
    });
  }
}); // View a specific job

router.get('/:id', function (req, res) {
  _job["default"].findById(req.params.id).then(function (job) {
    return res.json(job);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // Delete a job

router["delete"]('/:id', _auth["default"], function (req, res) {
  _job["default"].findByIdAndDelete(req.params.id).then(function () {
    return res.json('Job deleted!');
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});
var _default = router;
exports["default"] = _default;