import React from 'react';

class History extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='moves-container'>
          <div className='player-name'>X</div>
          <div className='player-name'>0</div>
          {this.getMovesList(this.props.history)}
        </div>

        <button disabled={this.props.history.length <= 1} onClick={this.props.restartGame}>Restart Game</button>
      </React.Fragment>
    );
  }

  getMovesList(history) {
    return history.map((current, step) => {
      if (current.move === -1) {
        return;
      }

      const desc = "Go to step #" + step + " " + this.getMoveCoordinate(current.move);

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
