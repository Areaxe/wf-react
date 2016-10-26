// https://github.com/flitbit/diff#differences
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

let _deepDiff = require('deep-diff');

let _deepDiff2 = _interopRequireDefault(_deepDiff);

let dictionary = {
  E: {
    color: '#2196F3',
    text: 'CHANGED:',
  },
  N: {
    color: '#4CAF50',
    text: 'ADDED:',
  },
  D: {
    color: '#F44336',
    text: 'DELETED:',
  },
  A: {
    color: '#2196F3',
    text: 'ARRAY:',
  },
};

function style(kind) {
  return 'color: ' + dictionary[kind].color + '; font-weight: bold';
}

function render(diff) {
  let kind = diff.kind;
  let path = diff.path;
  let lhs = diff.lhs;
  let rhs = diff.rhs;
  let index = diff.index;
  let item = diff.item;

  switch (kind) {
    case 'E':
      return path.join('.') + ' ' + lhs + ' → ' + rhs;
    case 'N':
      return path.join('.') + ' ' + rhs;
    case 'D':
      return '' + path.join('.');
    case 'A':
      return path.join('.') + '[' + index + ']', item;
    default:
      return null;
  }
}

function logger() {
  let options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (_ref) {
    let getState = _ref.getState;
    return function (next) {
      return function (action) {
        let _options$transformer = options.transformer;
        let transformer = _options$transformer === undefined ? function (state) {
          return state;
        } : _options$transformer;

        let prevState = transformer(getState());
        let returnValue = next(action);
        let newState = transformer(getState());
        let time = new Date();

        let diff = (0, _deepDiff2['default'])(prevState, newState);

        console.group('diff @', time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
        if (diff) {
          diff.forEach(function (elem) {
            let kind = elem.kind;

            let output = render(elem);

            console.log('%c ' + dictionary[kind].text, style(kind), output);
          });
        } else {
          console.log('—— no diff ——');
        }
        console.groupEnd('diff');

        return returnValue;
      };
    };
  };
}

exports['default'] = logger;
module.exports = exports['default'];