"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jobs = _interopRequireDefault(require("./jobs"));

var _doctors = _interopRequireDefault(require("./doctors"));

var _nurses = _interopRequireDefault(require("./nurses"));

var _stats = _interopRequireDefault(require("./stats"));

var _users = _interopRequireDefault(require("./users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  jobs: _jobs["default"],
  doctors: _doctors["default"],
  nurses: _nurses["default"],
  stats: _stats["default"],
  users: _users["default"]
};
exports["default"] = _default;