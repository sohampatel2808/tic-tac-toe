import React from 'react';

import './History.css';

class History extends React.Component {
  render() {
    return (
      <React.Fragment>
        <p>History: </p>

        {this.getMoves(this.props.history)}
      </React.Fragment>
    );
  }

  getMoves(moves) {
    return moves.map((move, step) => {
      const desc = step ? "Go to step #" + step : "Go to Game start";

      return (
        <li key={step}>
          <button onClick={this.handleClick.bind(this, step)}>
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
