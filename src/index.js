const { Component } = React;

class TodoApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: [
        { value: 'Web Programming HW1', done: false },
        { value: 'Machine Learning HW3', done: false },
        { value: 'Eat', done: true },
        { value: 'Sleep', done: true },
      ],
      inputText: '',
    };
  }

  handleInput = (text) => {
    this.setState({
      inputText: text
    });
  }

  handleSubmit = (ev) => {
    let todos = this.state.todos;
    const inputText = this.state.inputText;
    if ((ev.which === 13 || ev.keyCode === 13) && inputText.trim() !== '') {
      todos.splice(0, 0, {
        value: inputText,
        done: false,
      });
      this.setState({
        todos,
        inputText: '',
      });
    }
  }

  handleCheckClick = (idx) => {
    let todos = this.state.todos;
    const checkedItem = todos[idx]
    todos.splice(idx, 1, {
      value: checkedItem.value,
      done: !checkedItem.done,
    });
    this.setState({ todos });
  }

  handleButtonClick = (idx) => {
    let todos = this.state.todos;
    todos.splice(idx, 1);
    this.setState({ todos });
  }

  handleToggleAllCheckClick = (count) => {
    let todos = this.state.todos;
    const done = count ? true : false;
    todos.forEach((element, index, array) => {
      element.done = done;
      array[index] = element;
    });
    this.setState({ todos });
  }

  handleClearCompletedClick = () => {
    let todos = this.state.todos;
    this.setState({ todos: todos.filter((t) => !t.done) });
  }

  renderTodoItem = (input, idx) => {
    return (
      <TodoItem
        content={ input.value }
        done={ input.done }
        key={ idx }
        onCheckClick={ () => this.handleCheckClick(idx) }
        onButtonClick={ () => this.handleButtonClick(idx) }
      />
    );
  }
  
  render() {
    const count = this.state.todos.filter((t) => !t.done).length;
    return (
      <section className="todoapp">
        
        <header className="header">
          <h1>TODOS</h1>
          <InputBar 
            inputText={ this.state.inputText }
            onInputChange={ this.handleInput }
            onInputSubmit={ this.handleSubmit }
          />
        </header>

        <section className="main">
          <ToggleAll 
            itemCount={ count }
            onCheckClick={ () => this.handleToggleAllCheckClick(count) }
          />
          <ul className="todo-list">
            { this.state.todos.map((item, idx) => this.renderTodoItem(item, idx)) }
          </ul>
        </section>

        <footer className="footer">
          <CountDisplay 
            itemCount={ count }
          />
          <ClearCompleted 
            onButtonClick={ () => this.handleClearCompletedClick() }
          />
        </footer>

      </section>
    );
  }
}

class InputBar extends Component {
  handleInputBarChange = (ev) => {
    this.props.onInputChange(ev.target.value);
  }

  handleInputBarSubmit = (ev) => {
    this.props.onInputSubmit(ev);
  }

  render() {
    return (
      <input
        className="new-todo"
        value={ this.props.inputText }
        onChange={ this.handleInputBarChange }
        onKeyDown={ this.handleInputBarSubmit }
      />
    );
  }
}

class ToggleAll extends Component {
  render() {
    const checked = this.props.itemCount ? false : true;
    return (
      <div>
        <input
          className="toggle-all"
          type="checkbox"
          checked={ checked }
          onChange={ this.props.onCheckClick }
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
      </div>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li className={ this.props.done ? "completed" : "" }>
        <input 
          className="toggle"
          type="checkbox"
          checked={ this.props.done }
          onChange={ this.props.onCheckClick }
        />
        <label>{ this.props.content }</label>
        <button
          className="destroy"
          onClick={ this.props.onButtonClick }
        />
      </li>
    );
  }
}

class CountDisplay extends Component {
  calculateCount = (count) => {
    if (count) {
      return <span className="todo-count"><strong>{count}</strong> items left</span>;
    } else {
      return <span className="todo-count">no item</span>;
    }
  }
  render() {
    return (
      <div>
	      {this.calculateCount(this.props.itemCount)}
      </div>
    );
  }
}

class ClearCompleted extends Component {
  render() {
    return (
      <button 
        className="clear-completed"
        onClick={ this.props.onButtonClick }
      >Clear completed</button>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
