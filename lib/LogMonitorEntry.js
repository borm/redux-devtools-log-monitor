'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _LogMonitorEntryAction = require('./LogMonitorEntryAction');

var _LogMonitorEntryAction2 = _interopRequireDefault(_LogMonitorEntryAction);

var _function = require('react-pure-render/function');

var _function2 = _interopRequireDefault(_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  entry: {
    display: 'block',
    WebkitUserSelect: 'none'
  },

  root: {
    marginLeft: 0
  }
};

var getDeepItem = function getDeepItem(data, path) {
  return path.reduce(function (obj, key) {
    return obj && obj[key];
  }, data);
};
var dataIsEqual = function dataIsEqual(data, previousData, keyPath) {
  var path = [].concat(keyPath).reverse().slice(1);

  return getDeepItem(data, path) === getDeepItem(previousData, path);
};

var LogMonitorEntry = function (_Component) {
  _inherits(LogMonitorEntry, _Component);

  function LogMonitorEntry(props) {
    _classCallCheck(this, LogMonitorEntry);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _function2.default;

    _this.handleActionClick = _this.handleActionClick.bind(_this);
    _this.shouldExpandNode = _this.shouldExpandNode.bind(_this);
    return _this;
  }

  LogMonitorEntry.prototype.printState = function printState(state, error) {
    var _this2 = this;

    var errorText = error;
    if (!errorText) {
      try {
        var data = this.props.select(state);
        var theme = void 0;

        if (this.props.markStateDiff) {
          var previousData = typeof this.props.previousState !== 'undefined' ? this.props.select(this.props.previousState) : undefined;
          var getValueStyle = function getValueStyle(_ref, nodeType, keyPath) {
            var style = _ref.style;
            return {
              style: _extends({}, style, {
                backgroundColor: dataIsEqual(data, previousData, keyPath) ? 'transparent' : _this2.props.theme.base01
              })
            };
          };
          var getNestedNodeStyle = function getNestedNodeStyle(_ref2, keyPath) {
            var style = _ref2.style;
            return {
              style: _extends({}, style, keyPath.length > 1 ? {} : styles.root)
            };
          };
          theme = {
            extend: this.props.theme,
            tree: styles.tree,
            value: getValueStyle,
            nestedNode: getNestedNodeStyle
          };
        } else {
          theme = this.props.theme;
        }

        return _react2.default.createElement(_reactJsonTree2.default, {
          theme: theme,
          data: data,
          invertTheme: false,
          keyPath: ['state'],
          shouldExpandNode: this.shouldExpandNode });
      } catch (err) {
        errorText = 'Error selecting state.';
      }
    }

    return _react2.default.createElement(
      'div',
      { style: {
          color: this.props.theme.base08,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 35
        } },
      errorText
    );
  };

  LogMonitorEntry.prototype.handleActionClick = function handleActionClick(e) {
    var _props = this.props,
        actionId = _props.actionId,
        onActionClick = _props.onActionClick,
        onActionShiftClick = _props.onActionShiftClick;

    if (actionId > 0) {
      if (e.shiftKey) {
        onActionShiftClick(actionId);
      } else {
        onActionClick(actionId);
      }
    }
  };

  LogMonitorEntry.prototype.shouldExpandNode = function shouldExpandNode(keyName, data, level) {
    return this.props.expandStateRoot && level === 0;
  };

  LogMonitorEntry.prototype.render = function render() {
    var _props2 = this.props,
        actionId = _props2.actionId,
        error = _props2.error,
        action = _props2.action,
        state = _props2.state,
        collapsed = _props2.collapsed,
        selected = _props2.selected,
        inFuture = _props2.inFuture;

    var styleEntry = {
      opacity: collapsed ? 0.5 : 1,
      cursor: actionId > 0 ? 'pointer' : 'default'
    };

    return _react2.default.createElement(
      'div',
      { style: {
          opacity: selected ? 0.4 : inFuture ? 0.6 : 1, // eslint-disable-line no-nested-ternary
          textDecoration: collapsed ? 'line-through' : 'none',
          color: this.props.theme.base06
        } },
      _react2.default.createElement(_LogMonitorEntryAction2.default, {
        theme: this.props.theme,
        collapsed: collapsed,
        action: action,
        expandActionRoot: this.props.expandActionRoot,
        onClick: this.handleActionClick,
        style: _extends({}, styles.entry, styleEntry) }),
      !collapsed && _react2.default.createElement(
        'div',
        { style: { paddingLeft: 16 } },
        this.printState(state, error)
      )
    );
  };

  return LogMonitorEntry;
}(_react.Component);

LogMonitorEntry.propTypes = {
  state: _propTypes2.default.object.isRequired,
  action: _propTypes2.default.object.isRequired,
  actionId: _propTypes2.default.number.isRequired,
  select: _propTypes2.default.func.isRequired,
  inFuture: _propTypes2.default.bool,
  error: _propTypes2.default.string,
  onActionClick: _propTypes2.default.func.isRequired,
  onActionShiftClick: _propTypes2.default.func.isRequired,
  collapsed: _propTypes2.default.bool,
  selected: _propTypes2.default.bool,
  expandActionRoot: _propTypes2.default.bool,
  expandStateRoot: _propTypes2.default.bool
};
exports.default = LogMonitorEntry;