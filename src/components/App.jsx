import React from 'react';

import './App.css';
import Board from './Board';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      squares: Array(9).fill(null),
      currPlayerX: true
    }
  }

  render() {
    return (
      <React.Fragment>
        <Board
          squares={this.state.squares}
          handleClick={this.handleClick}/>

        <div className="game-status">
          {this.getGameStatus()}
        </div>
      </React.Fragment>
    );
  }

  handleClick(id) {
    if (this.state.squares[id] || this.calculateWinner()) {
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

  calculateWinner() {
    const squares = this.state.squares;
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

  getGameStatus() {
    let status;
    let winner = this.calculateWinner()

    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (this.state.currPlayerX ? 'X' : '0');
    }

    return status;
  }
}

export default App;
