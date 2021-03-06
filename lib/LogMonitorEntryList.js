'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _LogMonitorEntry = require('./LogMonitorEntry');

var _LogMonitorEntry2 = _interopRequireDefault(_LogMonitorEntry);

var _function = require('react-pure-render/function');

var _function2 = _interopRequireDefault(_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogMonitorEntryList = function (_Component) {
  _inherits(LogMonitorEntryList, _Component);

  function LogMonitorEntryList() {
    var _temp, _this, _ret;

    _classCallCheck(this, LogMonitorEntryList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.shouldComponentUpdate = _function2.default, _temp), _possibleConstructorReturn(_this, _ret);
  }

  LogMonitorEntryList.prototype.render = function render() {
    var elements = [];
    var _props = this.props,
        theme = _props.theme,
        actionsById = _props.actionsById,
        computedStates = _props.computedStates,
        currentStateIndex = _props.currentStateIndex,
        consecutiveToggleStartId = _props.consecutiveToggleStartId,
        select = _props.select,
        skippedActionIds = _props.skippedActionIds,
        stagedActionIds = _props.stagedActionIds,
        expandActionRoot = _props.expandActionRoot,
        expandStateRoot = _props.expandStateRoot,
        markStateDiff = _props.markStateDiff,
        onActionClick = _props.onActionClick,
        onActionShiftClick = _props.onActionShiftClick;


    for (var i = 0; i < stagedActionIds.length; i++) {
      var actionId = stagedActionIds[i];
      var action = actionsById[actionId].action;
      var _computedStates$i = computedStates[i],
          state = _computedStates$i.state,
          error = _computedStates$i.error;

      var previousState = void 0;
      if (i > 0) {
        previousState = computedStates[i - 1].state;
      }
      elements.push(_react2.default.createElement(_LogMonitorEntry2.default, { key: actionId,
        theme: theme,
        select: select,
        action: action,
        actionId: actionId,
        state: state,
        previousState: previousState,
        collapsed: skippedActionIds.indexOf(actionId) > -1,
        inFuture: i > currentStateIndex,
        selected: consecutiveToggleStartId === i,
        error: error,
        expandActionRoot: expandActionRoot,
        expandStateRoot: expandStateRoot,
        markStateDiff: markStateDiff,
        onActionClick: onActionClick,
        onActionShiftClick: onActionShiftClick }));
    }

    return _react2.default.createElement(
      'div',
      null,
      elements
    );
  };

  return LogMonitorEntryList;
}(_react.Component);

LogMonitorEntryList.propTypes = {
  actionsById: _propTypes2.default.object,
  computedStates: _propTypes2.default.array,
  stagedActionIds: _propTypes2.default.array,
  skippedActionIds: _propTypes2.default.array,
  currentStateIndex: _propTypes2.default.number,
  consecutiveToggleStartId: _propTypes2.default.number,

  select: _propTypes2.default.func.isRequired,
  onActionClick: _propTypes2.default.func.isRequired,
  theme: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  expandActionRoot: _propTypes2.default.bool,
  expandStateRoot: _propTypes2.default.bool
};
exports.default = LogMonitorEntryList;