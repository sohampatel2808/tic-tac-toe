import React from "react";

import './Board.css';
import Square from "./Square";

class Board extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div class="board-game">
          {this.renderSquares()}
        </div>
      </React.Fragment>
    );
  }

  renderSquares() {
    return this.props.squares.map((square, index) => {
      return this.renderSquare(index);
    });
  }

  renderSquare(id) {
    return (
      <Square 
        value={this.props.squares[id]}
        onClick={this.handleClick.bind(this, id)} />
    );
  }

  handleClick(id) {
    this.props.handleClick(id);
  }
}

export default Board;
