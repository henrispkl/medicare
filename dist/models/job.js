"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jobSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  jobType: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dates: {
    type: String,
    required: true
  },
  workingHours: {
    type: String,
    required: true
  },
  workingDays: {
    type: String,
    required: true
  },
  contractType: {
    type: String,
    required: true
  },
  shiftType: {
    type: String,
    required: true
  },
  description: String,
  postedBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var Job = _mongoose["default"].model('Job', jobSchema);

var _default = Job;
exports["default"] = _default;