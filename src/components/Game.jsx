import React from 'react';

import './App.css';
import Board from './Board';
import History from './History';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.jumptoStep = this.jumptoStep.bind(this);

    this.state = {
      history: [
        { squares: Array(9).fill(null) }
      ],
      stepNumber: 0,
      currPlayerX: true
    }
  }

  render() {
    return (
      <React.Fragment>
        <Board
          squares={this.getCurrentSquaresData()}
          handleClick={this.handleClick}/>

        <div className="game-status">
          {this.getGameStatus()}
        </div>

        <History 
          history={this.state.history}
          jumptoStep={this.jumptoStep} />
      </React.Fragment>
    );
  }

  handleClick(id) {
    let cloneHistory = this.state.history.slice(0, this.state.stepNumber + 1);
    let cloneCurrentSquares = this.getCurrentSquaresData().slice();

    if (cloneCurrentSquares[id] || this.calculateWinner()) {
      // value present in current square, do nothing
      return;
    }

    // set value of current square
    cloneCurrentSquares[id] = this.getCurrentPlayer();
    // push squares data in history array
    cloneHistory.push({squares: cloneCurrentSquares});

    this.setState({
      history: cloneHistory,
      stepNumber: cloneHistory.length - 1,
      currPlayerX: !this.state.currPlayerX
    });
  }

  jumptoStep(step) {
    this.setState({
      stepNumber: step,
      currPlayerX: (step % 2) === 0
    })
  }

  calculateWinner() {
    const currentSquares = this.getCurrentSquaresData();
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

      if (currentSquares[a] && currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
        return currentSquares[a];
      }
    }

    return null;
  }

  getGameStatus() {
    let status;
    let winner = this.calculateWinner();

    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + this.getCurrentPlayer();
    }

    return status;
  }

  getCurrentSquaresData() {
    const current = this.state.history[this.state.stepNumber];
    return current.squares;
  }

  getCurrentPlayer() {
    return this.state.currPlayerX ? 'X' : '0';
  }
}

export default App;