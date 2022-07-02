import React from 'react';

import './Game.css';
import Board from './Board';
import History from './History';
import { calculateWinner, checkForDraw } from './utils/Helper';

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
      score: {
        playerX: 0,
        player0: 0
      },
      stepNumber: 0,
      currPlayerX: true,
      gameCompleted: false
    };
  }

  render() {
    return (
      <div className='container'>
        <div className='board-container'>
          <Board
            gameCompleted={this.state.gameCompleted}
            state={this.getCurrentState()}
            handleClick={this.handleClick}/>

          <div className="game-status">
            {
              this.state.gameCompleted
                ? this.getGameCompletedStatus()
                : "Next Player: " + this.getCurrentPlayer()
            }
          </div>
        </div>

        <div className='history-container'>
          <History 
            step={this.state.stepNumber}
            history={this.state.history}
            score={this.state.score}
            jumptoStep={this.jumptoStep}
            restartGame={this.restartGame} />
        </div>
      </div>
    );
  }

  handleClick(id) {
    let cloneHistory = this.state.history.slice(0, this.state.stepNumber + 1);
    let cloneCurrentState = this.getCurrentState().slice();

    if (cloneCurrentState[id] || this.state.gameCompleted) {
      // value present in current square, do nothing
      return;
    }

    // set value of current square
    cloneCurrentState[id] = this.getCurrentPlayer();
    // push state data and move into history array
    cloneHistory.push({state: cloneCurrentState, move: id});

    let gameCompleted = false;
    let cloneScore = {...this.state.score};
    const winner = calculateWinner(cloneCurrentState)
    if (winner) {
      gameCompleted = true;

      if (winner === 'X') {
        cloneScore.playerX = cloneScore.playerX + 1;
      } else if (winner === '0') {
        cloneScore.player0 = cloneScore.player0 + 1;
      }
    } else if (checkForDraw(cloneCurrentState)) {
      gameCompleted = true;
    }

    this.setState({
      history: cloneHistory,
      score: cloneScore,
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

  getDefaultGameData() {
    return {
    }
  }

  getCurrentState() {
    const current = this.state.history[this.state.stepNumber];
    return current.state;
  }

  getCurrentPlayer() {
    return this.state.currPlayerX ? 'X' : '0';
  }

  getGameCompletedStatus() {
    const lastState = this.state.history[this.state.history.length - 1];
    let status;
    let winner = calculateWinner(lastState.state);

    if (winner) {
      status = "Winner: " + winner;
    } else if (checkForDraw(lastState.state)) {
      status = 'Draw!';
    }

    return status;
  }
}

export default App;
