(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactAsyncComponent"] = factory(require("react"));
	else
		root["ReactAsyncComponent"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAsyncContext;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAsyncContext() {
  var idPointer = 0;
  var registry = {};
  var errorRegistry = {};
  return {
    getNextId: function getNextId() {
      idPointer += 1;
      return idPointer;
    },
    registerComponent: function registerComponent(id, Component) {
      registry[id] = Component;
    },
    getComponent: function getComponent(id) {
      return registry[id];
    },
    registerError: function registerError(id, message) {
      errorRegistry[id] = message;
    },
    getError: function getError(id) {
      return errorRegistry[id];
    },
    getState: function getState() {
      return {
        resolved: Object.keys(registry).reduce(function (acc, cur) {
          return Object.assign(acc, _defineProperty({}, cur, true));
        }, {}),
        errors: Object.assign({}, errorRegistry)
      };
    }
  };
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _createAsyncContext = __webpack_require__(0);

var _createAsyncContext2 = _interopRequireDefault(_createAsyncContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncComponentProvider = function (_React$Component) {
  _inherits(AsyncComponentProvider, _React$Component);

  function AsyncComponentProvider() {
    _classCallCheck(this, AsyncComponentProvider);

    return _possibleConstructorReturn(this, (AsyncComponentProvider.__proto__ || Object.getPrototypeOf(AsyncComponentProvider)).apply(this, arguments));
  }

  _createClass(AsyncComponentProvider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.asyncContext = this.props.asyncContext || (0, _createAsyncContext2.default)();
      this.rehydrateState = this.props.rehydrateState;
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        asyncComponents: {
          getNextId: this.asyncContext.getNextId,
          registerComponent: this.asyncContext.registerComponent,
          getComponent: this.asyncContext.getComponent,
          registerError: this.asyncContext.registerError,
          getError: this.asyncContext.getError,
          getRehydrate: function getRehydrate(id) {
            var error = _this2.rehydrateState.errors[id];
            var resolved = _this2.rehydrateState.resolved[id];
            delete _this2.rehydrateState.errors[id];
            delete _this2.rehydrateState.resolved[id];
            return {
              // eslint-disable-next-line no-nested-ternary
              type: error ? 'error' : resolved ? 'resolved' : 'unresolved',
              error: error
            };
          }
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return AsyncComponentProvider;
}(_react2.default.Component);

AsyncComponentProvider.propTypes = {
  children: _react2.default.PropTypes.node.isRequired,
  asyncContext: _react2.default.PropTypes.shape({
    getNextId: _react2.default.PropTypes.func.isRequired,
    registerComponent: _react2.default.PropTypes.func.isRequired,
    getComponent: _react2.default.PropTypes.func.isRequired,
    registerError: _react2.default.PropTypes.func.isRequired,
    getError: _react2.default.PropTypes.func.isRequired
  }),
  rehydrateState: _react2.default.PropTypes.shape({
    resolved: _react2.default.PropTypes.object,
    errors: _react2.default.PropTypes.object
  })
};

AsyncComponentProvider.defaultProps = {
  asyncContext: undefined,
  rehydrateState: {
    resolved: {},
    errors: {}
  }
};

AsyncComponentProvider.childContextTypes = {
  asyncComponents: _react2.default.PropTypes.shape({
    getNextId: _react2.default.PropTypes.func.isRequired,
    registerComponent: _react2.default.PropTypes.func.isRequired,
    getComponent: _react2.default.PropTypes.func.isRequired,
    registerError: _react2.default.PropTypes.func.isRequired,
    getError: _react2.default.PropTypes.func.isRequired,
    getRehydrate: _react2.default.PropTypes.func.isRequired
  }).isRequired
};

exports.default = AsyncComponentProvider;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(1);

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

        if (typeof window !== 'undefined' || navigator.userAgent !== 'SSR') {
          // BROWSER BASED LOGIC

          var _getRehydrate = getRehydrate(id),
              type = _getRehydrate.type,
              error = _getRehydrate.error;

          if (type === 'unresolved') {
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
          if (false) {
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncComponent = exports.createAsyncContext = exports.AsyncComponentProvider = undefined;

var _AsyncComponentProvider = __webpack_require__(2);

var _AsyncComponentProvider2 = _interopRequireDefault(_AsyncComponentProvider);

var _createAsyncContext = __webpack_require__(0);

var _createAsyncContext2 = _interopRequireDefault(_createAsyncContext);

var _asyncComponent = __webpack_require__(3);

var _asyncComponent2 = _interopRequireDefault(_asyncComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AsyncComponentProvider = _AsyncComponentProvider2.default;
exports.createAsyncContext = _createAsyncContext2.default;
exports.asyncComponent = _asyncComponent2.default;

/***/ })
/******/ ]);
});