import React from 'react';

import './History.css';

class History extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='history-container'>
          <p>History: </p>

          {this.getMovesList(this.props.history)}
        </div>
      </React.Fragment>
    );
  }

  getMovesList(history) {
    return history.map((current, step) => {
      const desc = step ? "Go to step #" + step + " " + this.getMoveCoordinate(current.move) : "Go to Game start";

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

  getMoveCoordinate(index) {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;

    return ("(" + row + "," + col + ")");
  }
}

export default History;
