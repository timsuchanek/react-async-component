'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validSSRModes = ['render', 'defer', 'boundary'];

function asyncComponent(args) {
  var name = args.name,
      resolve = args.resolve,
      _args$es6Aware = args.es6Aware,
      es6Aware = _args$es6Aware === undefined ? true : _args$es6Aware,
      _args$ssrMode = args.ssrMode,
      ssrMode = _args$ssrMode === undefined ? 'render' : _args$ssrMode,
      LoadingComponent = args.LoadingComponent,
      ErrorComponent = args.ErrorComponent;


  if (validSSRModes.indexOf(ssrMode) === -1) {
    throw new Error('Invalid ssrMode provided to asyncComponent');
  }

  var id = null;

  // Takes the given module and if it has a ".default" the ".default" will
  // be returned. i.e. handy when you could be dealing with es6 imports.
  var es6Resolve = function es6Resolve(x) {
    return es6Aware && (typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') && typeof x.default !== 'undefined' ? x.default : x;
  };

  var getResolver = function getResolver() {
    var resolver = void 0;
    try {
      resolver = resolve();
    } catch (err) {
      return Promise.reject(err);
    }

    // Just in case the user is returning the component synchronously, we
    // will ensure it gets wrapped into a promise
    return Promise.resolve(resolver);
  };

  var AsyncComponent = function (_React$Component) {
    _inherits(AsyncComponent, _React$Component);

    function AsyncComponent(props, context) {
      _classCallCheck(this, AsyncComponent);

      var _this = _possibleConstructorReturn(this, (AsyncComponent.__proto__ || Object.getPrototypeOf(AsyncComponent)).call(this, props));

      _this.state = { Component: null };

      // Assign a unique id to this instance if it hasn't already got one.
      var asyncComponents = context.asyncComponents;
      var getNextId = asyncComponents.getNextId;

      if (!id) {
        id = getNextId();
      }
      return _this;
    }

    _createClass(AsyncComponent, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          asyncComponentsAncestor: {
            isBoundary: ssrMode === 'boundary'
          }
        };
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var asyncComponents = this.context.asyncComponents;
        var getComponent = asyncComponents.getComponent,
            getError = asyncComponents.getError;

        if (!getError(id) && !getComponent(id)) {
          this.resolveComponent();
        }
      }

      // @see react-async-bootstrapper

    }, {
      key: 'asyncBootstrapperTarget',
      value: function asyncBootstrapperTarget() {
        var _this2 = this;

        var asyncComponents = this.context.asyncComponents;
        var registerError = asyncComponents.registerError,
            getRehydrate = asyncComponents.getRehydrate;


        var doResolve = function doResolve() {
          return _this2.resolveComponent().then(function (Component) {
            return typeof Component === 'function';
          });
        };

        if (typeof window !== 'undefined') {
          // BROWSER BASED LOGIC

          var _getRehydrate = getRehydrate(id),
              type = _getRehydrate.type,
              error = _getRehydrate.error;

          if (type === 'unresolved') {
            if (navigator.userAgent !== 'SSR') {
              return doResolve();
            }
            return false;
          }
          if (type === 'error') {
            registerError(id, error);
            return false;
          }
          return doResolve();
        }

        // NODE BASED LOGIC

        var asyncComponentsAncestor = this.context.asyncComponentsAncestor;

        var isChildOfBoundary = asyncComponentsAncestor && asyncComponentsAncestor.isBoundary;

        if (ssrMode === 'defer' || isChildOfBoundary) {
          return false;
        }

        return doResolve();
      }
    }, {
      key: 'resolveComponent',
      value: function resolveComponent() {
        var _this3 = this;

        return getResolver().then(function (Component) {
          if (_this3.unmounted) {
            return undefined;
          }
          _this3.context.asyncComponents.registerComponent(id, Component);
          if (_this3.setState) {
            _this3.setState({
              Component: es6Resolve(Component)
            });
          }
          return Component;
        }).catch(function (error) {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('Error resolving async component:');
            // eslint-disable-next-line no-console
            console.log(error);
          }
          _this3.context.asyncComponents.registerError(id, error.message);
          _this3.setState({ error: error.message });
          return undefined;
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unmounted = true;
      }
    }, {
      key: 'render',
      value: function render() {
        var asyncComponents = this.context.asyncComponents;
        var getComponent = asyncComponents.getComponent,
            getError = asyncComponents.getError;


        var error = getError(id);
        if (error) {
          return ErrorComponent ? _react2.default.createElement(ErrorComponent, { message: error }) : null;
        }

        var Component = es6Resolve(getComponent(id));
        // eslint-disable-next-line no-nested-ternary
        return Component ? _react2.default.createElement(Component, this.props) : LoadingComponent ? _react2.default.createElement(LoadingComponent, this.props) : null;
      }
    }]);

    return AsyncComponent;
  }(_react2.default.Component);

  AsyncComponent.childContextTypes = {
    asyncComponentsAncestor: _react2.default.PropTypes.shape({
      isBoundary: _react2.default.PropTypes.bool
    }).isRequired
  };

  AsyncComponent.contextTypes = {
    asyncComponentsAncestor: _react2.default.PropTypes.shape({
      isBoundary: _react2.default.PropTypes.bool
    }),
    asyncComponents: _react2.default.PropTypes.shape({
      getNextId: _react2.default.PropTypes.func.isRequired,
      getComponent: _react2.default.PropTypes.func.isRequired,
      registerComponent: _react2.default.PropTypes.func.isRequired,
      registerError: _react2.default.PropTypes.func.isRequired,
      getError: _react2.default.PropTypes.func.isRequired
    }).isRequired
  };

  AsyncComponent.displayName = name || 'AsyncComponent';

  return AsyncComponent;
}

exports.default = asyncComponent;