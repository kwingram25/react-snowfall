"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _config = require("./config");

var _hooks = require("./hooks");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultConfig = {
  color: '#dee4fd'
};

var Snowfall = function Snowfall() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref$snowflakeCount = _ref.snowflakeCount,
      snowflakeCount = _ref$snowflakeCount === void 0 ? 150 : _ref$snowflakeCount,
      style = _ref.style,
      config = _objectWithoutProperties(_ref, ["snowflakeCount", "style"]);

  var mergedStyle = (0, _hooks.useSnowfallStyle)(style);
  var canvasRef = (0, _react.useRef)();
  var canvasSize = (0, _hooks.useComponentSize)(canvasRef);
  var animationFrame = (0, _react.useRef)(0);
  var lastUpdate = (0, _react.useRef)(Date.now());
  var mergedConfig = (0, _react.useMemo)(function () {
    return _objectSpread({}, defaultConfig, config);
  }, [config]);
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