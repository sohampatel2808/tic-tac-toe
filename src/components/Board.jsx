import React from "react";

import './Board.css';
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      currPlayerX: true
    }
  }

  render() {
    let playerInfo;
    const winner = this.calculateWinner(this.state.squares);

    if (winner) {
      playerInfo = "Winner: " + winner;
    } else {
      playerInfo = "Next Player: " + (this.state.currPlayerX ? 'X' : '0');
    }

    return (
      <React.Fragment>
        <div class="board-game">
          {this.renderSquares()}

          <div className="player-info">
            {playerInfo}
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderSquares() {
    let squares = [];

    for (let i = 0; i < this.state.squares.length; i++) {
      squares.push(this.renderSquare(i));
    }

    return squares;
  }

  renderSquare(id) {
    const value = this.state.squares[id];

    return (
      <Square value={value} onClick={this.handleClick.bind(this, id)} />
    );
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  handleClick(id) {
    if (this.state.squares[id] || this.calculateWinner(this.state.squares)) {
      // value present in current square, do nothing
      return;
    }

    const cloneSquares = this.state.squares.slice();

    // set value for current square
    cloneSquares[id] = this.state.currPlayerX ? 'X' : '0';

    this.setState({
      squares: cloneSquares,
      currPlayerX: !this.state.currPlayerX
    });
  }
}

export default Board;
