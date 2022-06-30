import React from "react";

import './Board.css';
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

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
    let squares = [];

    for (let i = 0; i < this.props.squares.length; i++) {
      squares.push(this.renderSquare(i));
    }

    return squares;
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
