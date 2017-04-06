'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React = React,
    Component = _React.Component;

var TodoApp = function (_Component) {
  _inherits(TodoApp, _Component);

  function TodoApp(props, context) {
    _classCallCheck(this, TodoApp);

    var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props, context));

    _this.handleInput = function (text) {
      _this.setState({
        inputText: text
      });
    };

    _this.handleSubmit = function (ev) {
      var todos = _this.state.todos;
      var inputText = _this.state.inputText;
      if ((ev.which === 13 || ev.keyCode === 13) && inputText.trim() !== '') {
        todos.splice(0, 0, {
          value: inputText,
          done: false
        });
        _this.setState({
          todos: todos,
          inputText: ''
        });
      }
    };

    _this.handleCheckClick = function (idx) {
      var todos = _this.state.todos;
      var checkedItem = todos[idx];
      todos.splice(idx, 1, {
        value: checkedItem.value,
        done: !checkedItem.done
      });
      _this.setState({ todos: todos });
    };

    _this.handleButtonClick = function (idx) {
      var todos = _this.state.todos;
      todos.splice(idx, 1);
      _this.setState({ todos: todos });
    };

    _this.handleToggleAllCheckClick = function (count) {
      var todos = _this.state.todos;
      var done = count ? true : false;
      todos.forEach(function (element, index, array) {
        element.done = done;
        array[index] = element;
      });
      _this.setState({ todos: todos });
    };

    _this.handleClearCompletedClick = function () {
      var todos = _this.state.todos;
      _this.setState({ todos: todos.filter(function (t) {
          return !t.done;
        }) });
    };

    _this.renderTodoItem = function (input, idx) {
      return React.createElement(TodoItem, {
        content: input.value,
        done: input.done,
        key: idx,
        onCheckClick: function onCheckClick() {
          return _this.handleCheckClick(idx);
        },
        onButtonClick: function onButtonClick() {
          return _this.handleButtonClick(idx);
        }
      });
    };

    _this.state = {
      todos: [{ value: 'Web Programming HW1', done: false }, { value: 'Machine Learning HW3', done: false }, { value: 'Eat', done: true }, { value: 'Sleep', done: true }],
      inputText: ''
    };
    return _this;
  }

  _createClass(TodoApp, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var count = this.state.todos.filter(function (t) {
        return !t.done;
      }).length;
      return React.createElement(
        'section',
        { className: 'todoapp' },
        React.createElement(
          'header',
          { className: 'header' },
          React.createElement(
            'h1',
            null,
            'TODOS'
          ),
          React.createElement(InputBar, {
            inputText: this.state.inputText,
            onInputChange: this.handleInput,
            onInputSubmit: this.handleSubmit
          })
        ),
        React.createElement(
          'section',
          { className: 'main' },
          React.createElement(ToggleAll, {
            itemCount: count,
            onCheckClick: function onCheckClick() {
              return _this2.handleToggleAllCheckClick(count);
            }
          }),
          React.createElement(
            'ul',
            { className: 'todo-list' },
            this.state.todos.map(function (item, idx) {
              return _this2.renderTodoItem(item, idx);
            })
          )
        ),
        React.createElement(
          'footer',
          { className: 'footer' },
          React.createElement(CountDisplay, {
            itemCount: count
          }),
          React.createElement(ClearCompleted, {
            onButtonClick: function onButtonClick() {
              return _this2.handleClearCompletedClick();
            }
          })
        )
      );
    }
  }]);

  return TodoApp;
}(Component);

var InputBar = function (_Component2) {
  _inherits(InputBar, _Component2);

  function InputBar() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, InputBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = InputBar.__proto__ || Object.getPrototypeOf(InputBar)).call.apply(_ref, [this].concat(args))), _this3), _this3.handleInputBarChange = function (ev) {
      _this3.props.onInputChange(ev.target.value);
    }, _this3.handleInputBarSubmit = function (ev) {
      _this3.props.onInputSubmit(ev);
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(InputBar, [{
    key: 'render',
    value: function render() {
      return React.createElement('input', {
        className: 'new-todo',
        value: this.props.inputText,
        onChange: this.handleInputBarChange,
        onKeyDown: this.handleInputBarSubmit
      });
    }
  }]);

  return InputBar;
}(Component);

var ToggleAll = function (_Component3) {
  _inherits(ToggleAll, _Component3);

  function ToggleAll() {
    _classCallCheck(this, ToggleAll);

    return _possibleConstructorReturn(this, (ToggleAll.__proto__ || Object.getPrototypeOf(ToggleAll)).apply(this, arguments));
  }

  _createClass(ToggleAll, [{
    key: 'render',
    value: function render() {
      var checked = this.props.itemCount ? false : true;
      return React.createElement(
        'div',
        null,
        React.createElement('input', {
          className: 'toggle-all',
          type: 'checkbox',
          checked: checked,
          onChange: this.props.onCheckClick
        }),
        React.createElement(
          'label',
          { htmlFor: 'toggle-all' },
          'Mark all as complete'
        )
      );
    }
  }]);

  return ToggleAll;
}(Component);

var TodoItem = function (_Component4) {
  _inherits(TodoItem, _Component4);

  function TodoItem() {
    _classCallCheck(this, TodoItem);

    return _possibleConstructorReturn(this, (TodoItem.__proto__ || Object.getPrototypeOf(TodoItem)).apply(this, arguments));
  }

  _createClass(TodoItem, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'li',
        { className: this.props.done ? "completed" : "" },
        React.createElement('input', {
          className: 'toggle',
          type: 'checkbox',
          checked: this.props.done,
          onChange: this.props.onCheckClick
        }),
        React.createElement(
          'label',
          null,
          this.props.content
        ),
        React.createElement('button', {
          className: 'destroy',
          onClick: this.props.onButtonClick
        })
      );
    }
  }]);

  return TodoItem;
}(Component);

var CountDisplay = function (_Component5) {
  _inherits(CountDisplay, _Component5);

  function CountDisplay() {
    var _ref2;

    var _temp2, _this6, _ret2;

    _classCallCheck(this, CountDisplay);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this6 = _possibleConstructorReturn(this, (_ref2 = CountDisplay.__proto__ || Object.getPrototypeOf(CountDisplay)).call.apply(_ref2, [this].concat(args))), _this6), _this6.calculateCount = function (count) {
      if (count) {
        return React.createElement(
          'span',
          { className: 'todo-count' },
          React.createElement(
            'strong',
            null,
            count
          ),
          ' items left'
        );
      } else {
        return React.createElement(
          'span',
          { className: 'todo-count' },
          'no item'
        );
      }
    }, _temp2), _possibleConstructorReturn(_this6, _ret2);
  }

  _createClass(CountDisplay, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.calculateCount(this.props.itemCount)
      );
    }
  }]);

  return CountDisplay;
}(Component);

var ClearCompleted = function (_Component6) {
  _inherits(ClearCompleted, _Component6);

  function ClearCompleted() {
    _classCallCheck(this, ClearCompleted);

    return _possibleConstructorReturn(this, (ClearCompleted.__proto__ || Object.getPrototypeOf(ClearCompleted)).apply(this, arguments));
  }

  _createClass(ClearCompleted, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'button',
        {
          className: 'clear-completed',
          onClick: this.props.onButtonClick
        },
        'Clear completed'
      );
    }
  }]);

  return ClearCompleted;
}(Component);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('root'));