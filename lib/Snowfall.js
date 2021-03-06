"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _config = require("./config");

var _hooks = require("./hooks");

var _Snowflake = require("./Snowflake");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var Snowfall = function Snowfall() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$snowflakeCount = _ref.snowflakeCount,
      snowflakeCount = _ref$snowflakeCount === void 0 ? 150 : _ref$snowflakeCount,
      style = _ref.style,
      config = _ref.config;

  var mergedStyle = (0, _hooks.useSnowfallStyle)(style);
  var canvasRef = (0, _react.useRef)();
  var canvasSize = (0, _hooks.useComponentSize)(canvasRef);
  var animationFrame = (0, _react.useRef)(0);
  var lastUpdate = (0, _react.useRef)(Date.now());

  var _ref2 = config || {},
      _ref2$color = _ref2.color,
      color = _ref2$color === void 0 ? _Snowflake.defaultConfig.color : _ref2$color,
      _ref2$speed = _ref2.speed,
      speed = _ref2$speed === void 0 ? _Snowflake.defaultConfig.speed : _ref2$speed,
      _ref2$wind = _ref2.wind,
      wind = _ref2$wind === void 0 ? _Snowflake.defaultConfig.wind : _ref2$wind,
      _ref2$radius = _ref2.radius,
      radius = _ref2$radius === void 0 ? _Snowflake.defaultConfig.radius : _ref2$radius,
      _ref2$changeFrequency = _ref2.changeFrequency,
      changeFrequency = _ref2$changeFrequency === void 0 ? _Snowflake.defaultConfig.changeFrequency : _ref2$changeFrequency;

  var mergedConfig = (0, _react.useMemo)(function () {
    return Object.assign({}, _Snowflake.defaultConfig, {
      color: color,
      speed: speed,
      wind: wind,
      radius: radius,
      changeFrequency: changeFrequency
    });
  }, [color, speed, wind, radius, changeFrequency]);
  var snowflakes = (0, _hooks.useSnowflakes)(canvasRef, snowflakeCount, mergedConfig);

  var updateCanvasRef = function updateCanvasRef(element) {
    canvasRef.current = element;
  };

  var render = (0, _react.useCallback)(function () {
    var framesPassed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var canvas = canvasRef.current;

    if (canvas) {
      // Update the positions of the snowflakes
      snowflakes.forEach(function (snowflake) {
        return snowflake.update(canvas, framesPassed);
      }); // Render them if the canvas is available

      var ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        snowflakes.forEach(function (snowflake) {
          return snowflake.draw(canvas, ctx);
        });
      }
    }
  }, [snowflakes]);
  var loop = (0, _react.useCallback)(function () {
    // Update based on time passed so that a slow frame rate won't slow down the snowflake
    var now = Date.now();
    var msPassed = Date.now() - lastUpdate.current;
    lastUpdate.current = now; // Frames that would have passed if running at 60 fps

    var framesPassed = msPassed / _config.targetFrameTime;
    render(framesPassed);
    animationFrame.current = requestAnimationFrame(loop);
  }, [render]);
  (0, _react.useEffect)(function () {
    loop();
    return function () {
      return cancelAnimationFrame(animationFrame.current);
    };
  }, [loop]);
  return _react["default"].createElement("canvas", {
    ref: updateCanvasRef,
    height: canvasSize.height,
    width: canvasSize.width,
    style: mergedStyle
  });
};

var _default = Snowfall;
exports["default"] = _default;
//# sourceMappingURL=Snowfall.js.map