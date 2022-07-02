import React from 'react';

import './Game.css';
import Board from './Board';
import History from './History';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.jumptoStep = this.jumptoStep.bind(this);
    this.restartGame = this.restartGame.bind(this);

    this.state = {
      history: [
        { state: Array(9).fill(null), move: -1 }
      ],
      stepNumber: 0,
      currPlayerX: true,
      gameCompleted: false
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='board-container'>
          <Board
            state={this.getCurrentState()}
            handleClick={this.handleClick}/>

          <div className="game-status">
            {this.state.gameCompleted ? this.getGameCompletedStatus() : "Next Player: " + this.getCurrentPlayer()}
          </div>
        </div>

        <div className='history-container'>
          <History 
            step={this.state.stepNumber}
            history={this.state.history}
            jumptoStep={this.jumptoStep}
            restartGame={this.restartGame} />
        </div>
      </div>
    );
  }

  handleClick(id) {
    let gameCompleted = false;
    let cloneHistory = this.state.history.slice(0, this.state.stepNumber + 1);
    let cloneCurrentState = this.getCurrentState().slice();

    if (cloneCurrentState[id] || this.state.gameCompleted) {
      // value present in current square, do nothing
      return;
    }

    // set value of current square
    cloneCurrentState[id] = this.getCurrentPlayer();
    // push squares data in history array
    cloneHistory.push({state: cloneCurrentState, move: id});

    if (this.calculateWinner(cloneCurrentState) || this.checkForDraw(cloneCurrentState)) {
      gameCompleted = true;
    }

    this.setState({
      history: cloneHistory,
      stepNumber: cloneHistory.length - 1,
      currPlayerX: !this.state.currPlayerX,
      gameCompleted: gameCompleted
    });
  }

  jumptoStep(step) {
    this.setState({
      stepNumber: step,
      currPlayerX: (step % 2) === 0
    })
  }

  restartGame() {
    this.setState({
      history: [
        { state: Array(9).fill(null), move: -1 }
      ],
      stepNumber: 0,
      currPlayerX: true,
      gameCompleted: false
    });
  }

  getCurrentState() {
    const current = this.state.history[this.state.stepNumber];
    return current.state;
  }

  getCurrentPlayer() {
    return this.state.currPlayerX ? 'X' : '0';
  }

  calculateWinner(state) {
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

      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }

    return null;
  }

  checkForDraw(state) {
    for (let i = 0; i < state.length; i++) {
      if (state[i] === null) {
        return false;
      }
    }

    return true;
  }

  getGameCompletedStatus() {
    const lastState = this.state.history[this.state.history.length - 1];
    let status;
    let winner = this.calculateWinner(lastState.state);

    if (winner) {
      status = "Winner: " + winner;
    } else if (this.checkForDraw(lastState.state)) {
      status = 'Draw!';
    }

    return status;
  }
}

export default App;
