"use strict";

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _routes = _interopRequireDefault(require("./routes"));

var _path = _interopRequireDefault(require("path"));

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])(); // Middleware to let json data be acessed in the req.body

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
})); // Middleware for CORS

app.use((0, _cors["default"])()); // Routes

app.use('/api/jobs', _routes["default"].jobs);
app.use('/api/doctors', _routes["default"].doctors);
app.use('/api/nurses', _routes["default"].nurses);
app.use('/api/stats', _routes["default"].stats);
app.use('/api/users', _routes["default"].users);
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../client/build'))); // If no API routes are hit, send the React app

app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '../client/build/index.html'));
}); // Mongoose

_mongoose["default"].set('useUnifiedTopology', true);

var connectDb = function connectDb() {
  return _mongoose["default"].connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
}; // Init server


connectDb().then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee() {
  return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          app.listen(process.env.PORT, function () {
            console.log("Medicare test server running on port ".concat(process.env.PORT));
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));