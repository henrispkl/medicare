"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var doctorSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  company: String
});

var Doctor = _mongoose["default"].model('Doctor', doctorSchema);

var _default = Doctor;
exports["default"] = _default;