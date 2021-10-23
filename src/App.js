// transpileに import Reactが必須。jsxがなければ不要
import React, { Component } from "react";

const App = () => <Counter></Counter>;

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  handlePlusButton = () => {
    this.setState({ count: this.state.count + 1 });
  };
  handleMinusButton = () => {
    // setState → stateの変更+DOMの再描写
    this.setState({ count: this.state.count - 1 });
  };
  render() {
    // console.log("render:", this.state.count);
    return (
      <React.Fragment>
        <div>count: {this.state.count}</div>
        <button onClick={this.handlePlusButton}>+1</button>
        <button onClick={this.handleMinusButton}>-1</button>
      </React.Fragment>
    );
  }
}

export default App;
