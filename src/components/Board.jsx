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
    const playerInfo = this.state.currPlayerX ? 'X' : '0';

    return (
      <React.Fragment>
        <div class="board-game">
          {this.renderSquares()}

          <div className="player-info">
            Player: {playerInfo}
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

  handleClick(id) {
    const cloneSquares = this.state.squares.slice();

    if (cloneSquares[id]) {
      // value present in current square, do nothing
      return;
    }

    // set value for current square
    cloneSquares[id] = this.state.currPlayerX ? 'X' : '0';

    this.setState({
      squares: cloneSquares,
      currPlayerX: !this.state.currPlayerX
    });
  }
}

export default Board;
