import React from 'react';

import { getMoveCoordinate } from './utils/Helper';

class History extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='moves-container'>
          <div className='grid-container'>
            <div className='player-name'>Player X</div>
            <div className='player-name'>Player 0</div>

            <div className='player-score'>{this.props.score.playerX + " - "}{this.props.score.player0}</div>
            
            {this.getMovesList()}
          </div>
        </div>

        <button className="button" disabled={this.props.history.length <= 1} onClick={this.props.restartGame}>Restart Game</button>
      </React.Fragment>
    );
  }

  getMovesList() {
    return this.props.history.map((current, step) => {
      if (current.move === -1) {
        return;
      }

      let desc = "Go to step #" + step + " " + getMoveCoordinate(current.move)

      if (step === this.props.step) {
        desc = <span style={{fontWeight: 600}}>{desc}</span>
      }

      return (
        <li key={step}>
          <button className="move-item" onClick={this.handleClick.bind(this, step)}>
            {desc}
          </button>
        </li>
      );
    });
  }

  handleClick(step) {
    this.props.jumptoStep(step);
  }
}

export default History;
