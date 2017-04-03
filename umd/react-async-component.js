(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactAsyncComponent"] = factory(require("react"));
	else
		root["ReactAsyncComponent"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createContext;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createContext() {
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _createContext = __webpack_require__(1);

var _createContext2 = _interopRequireDefault(_createContext);

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
      this.execContext = this.props.execContext || (0, _createContext2.default)();
      this.rehydrateState = this.props.initialState;
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        asyncComponents: {
          getNextId: this.execContext.getNextId,
          registerComponent: this.execContext.registerComponent,
          getComponent: this.execContext.getComponent,
          registerError: this.execContext.registerError,
          getError: this.execContext.getError,
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
  execContext: _react2.default.PropTypes.shape({
    getNextId: _react2.default.PropTypes.func.isRequired,
    registerComponent: _react2.default.PropTypes.func.isRequired,
    getComponent: _react2.default.PropTypes.func.isRequired,
    registerError: _react2.default.PropTypes.func.isRequired,
    getError: _react2.default.PropTypes.func.isRequired
  }),
  initialState: _react2.default.PropTypes.shape({
    resolved: _react2.default.PropTypes.object,
    errors: _react2.default.PropTypes.object
  })
};

AsyncComponentProvider.defaultProps = {
  execContext: undefined,
  initialState: {
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

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validSSRModes = ['render', 'defer', 'boundary'];

function createAsyncComponent(args) {
  var name = args.name,
      resolve = args.resolve,
      _args$es6Aware = args.es6Aware,
      es6Aware = _args$es6Aware === undefined ? true : _args$es6Aware,
      _args$ssrMode = args.ssrMode,
      ssrMode = _args$ssrMode === undefined ? 'render' : _args$ssrMode,
      LoadingComponent = args.LoadingComponent,
      ErrorComponent = args.ErrorComponent;


  if (validSSRModes.indexOf(ssrMode) === -1) {
    throw new Error('Invalid ssrMode provided to createAsyncComponent');
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

exports.default = createAsyncComponent;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = asyncBootstrapper;

var _reactTreeWalker = __webpack_require__(5);

var _reactTreeWalker2 = _interopRequireDefault(_reactTreeWalker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncBootstrapper(app) {
  var visitor = function visitor(element, instance) {
    if (instance && typeof instance.asyncBootstrapperTarget === 'function') {
      return instance.asyncBootstrapperTarget();
    }
    return true;
  };

  return (0, _reactTreeWalker2.default)(app, visitor, {})
  // Swallow errors.
  .catch(function () {
    return undefined;
  });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromise = undefined;
exports.default = reactTreeWalker;

var _react = __webpack_require__(0);

// Lifted from https://github.com/sindresorhus/p-reduce
// Thanks @sindresorhus!
var pReduce = function pReduce(iterable, reducer, initVal) {
  return new Promise(function (resolve, reject) {
    var iterator = iterable[Symbol.iterator]();
    var i = 0;

    var next = function next(total) {
      var el = iterator.next();

      if (el.done) {
        resolve(total);
        return;
      }

      Promise.all([total, el.value]).then(function (value) {
        // eslint-disable-next-line no-plusplus
        next(reducer(value[0], value[1], i++));
      }).catch(reject);
    };

    next(initVal);
  });
};

// Lifted from https://github.com/sindresorhus/p-map-series
// Thanks @sindresorhus!
/* eslint-disable no-console */

// Inspired by the awesome work done by the Apollo team.
// See https://github.com/apollostack/react-apollo/blob/master/src/server.ts
// This version has been adapted to be promise based.

// eslint-disable-next-line import/no-extraneous-dependencies
var pMapSeries = function pMapSeries(iterable, iterator) {
  var ret = [];

  return pReduce(iterable, function (a, b, i) {
    return Promise.resolve(iterator(b, i)).then(function (val) {
      ret.push(val);
    });
  }).then(function () {
    return ret;
  });
};

var isPromise = exports.isPromise = function isPromise(x) {
  return x != null && typeof x.then === 'function';
};

// Recurse an React Element tree, running visitor on each element.
// If visitor returns `false`, don't call the element's render function
// or recurse into its child elements
function reactTreeWalker(element, visitor, context) {
  return new Promise(function (resolve) {
    var doVisit = function doVisit(getChildren, visitorResult, childContext, isChildren) {
      var doTraverse = function doTraverse(shouldContinue) {
        if (!shouldContinue) {
          // We recieved a false, which indicates a desire to stop traversal.
          resolve();
        }

        var child = getChildren();
        var theChildContext = typeof childContext === 'function' ? childContext() : childContext;

        if (child == null) {
          // If no children then we can't traverse.  We've reached the leaf.
          resolve();
        } else if (isChildren) {
          // If its a react Children collection we need to breadth-first
          // traverse each of them.
          var mapper = function mapper(aChild) {
            return aChild ? reactTreeWalker(aChild, visitor, theChildContext) : undefined;
          };
          // pMapSeries allows us to do depth-first traversal. Thanks @sindresorhus!
          pMapSeries(_react.Children.map(child, function (cur) {
            return cur;
          }), mapper).then(resolve);
        } else {
          // Otherwise we pass the individual child to the next recursion.
          reactTreeWalker(child, visitor, theChildContext).then(resolve);
        }
      };

      if (visitorResult === false) {
        // Visitor returned false, indicating a desire to not traverse.
        resolve();
      } else if (isPromise(visitorResult)) {
        // We need to execute the result and pass it's result through to our
        // continuer.
        visitorResult.then(doTraverse).catch(function (e) {
          console.log('Error occurred in Promise based visitor result provided to react-tree-walker.');
          if (e) {
            console.log(e);
            if (e.stack) {
              console.log(e.stack);
            }
          }
        });
      } else {
        doTraverse(true);
      }
    };

    // Is this element a Component?
    if (typeof element.type === 'function') {
      var Component = element.type;
      var props = Object.assign({}, Component.defaultProps, element.props);

      // Is this a class component? (http://bit.ly/2j9Ifk3)
      var isReactClassComponent = Component.prototype && (Component.prototype.isReactComponent || Component.prototype.isPureReactComponent);

      if (isReactClassComponent) {
        // React class component

        var instance = new Component(props, context);

        // In case the user doesn't pass these to super in the constructor
        instance.props = instance.props || props;
        instance.context = instance.context || context;

        // Make the setState synchronous.
        instance.setState = function (newState) {
          instance.state = Object.assign({}, instance.state, newState);
        };

        doVisit(function () {
          // Call componentWillMount if it exists.
          if (instance.componentWillMount) {
            instance.componentWillMount();
          }

          return instance.render();
        }, visitor(element, instance, context), function () {
          return (
            // Ensure the child context is initialised if it is available. We will
            // need to pass it down the tree.
            instance.getChildContext ? Object.assign({}, context, instance.getChildContext()) : context
          );
        });
      } else {
        // Stateless Functional Component
        doVisit(function () {
          return Component(props, context);
        }, visitor(element, null, context), context);
      }
    } else {
      // This must be a basic element, such as a string or dom node.
      doVisit(function () {
        return element.props && element.props.children ? element.props.children : undefined;
      }, visitor(element, null, context), context, true);
    }
  });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncBootstrapper = exports.createAsyncComponent = exports.createContext = exports.AsyncComponentProvider = undefined;

var _reactAsyncBootstrapper = __webpack_require__(4);

var _reactAsyncBootstrapper2 = _interopRequireDefault(_reactAsyncBootstrapper);

var _AsyncComponentProvider = __webpack_require__(2);

var _AsyncComponentProvider2 = _interopRequireDefault(_AsyncComponentProvider);

var _createContext = __webpack_require__(1);

var _createContext2 = _interopRequireDefault(_createContext);

var _createAsyncComponent = __webpack_require__(3);

var _createAsyncComponent2 = _interopRequireDefault(_createAsyncComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AsyncComponentProvider = _AsyncComponentProvider2.default;
exports.createContext = _createContext2.default;
exports.createAsyncComponent = _createAsyncComponent2.default;
exports.asyncBootstrapper = _reactAsyncBootstrapper2.default;

/***/ })
/******/ ]);
});