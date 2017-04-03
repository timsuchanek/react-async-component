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