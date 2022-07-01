import React from "react";

import Square from "./Square";

class Board extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div class="board">
          {this.renderSquares()}
        </div>
      </React.Fragment>
    );
  }

  renderSquares() {
    return this.props.state.map((square, index) => {
      return this.renderSquare(index);
    });
  }

  renderSquare(id) {
    return (
      <Square 
        value={this.props.state[id]}
        onClick={this.handleClick.bind(this, id)} />
    );
  }

  handleClick(id) {
    this.props.handleClick(id);
  }
}

export default Board;
