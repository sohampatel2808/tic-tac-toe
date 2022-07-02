import React from 'react';

class History extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='moves-container'>
        <div className='grid-container'>
          <div className='player-name'>X</div>
          <div className='player-name'>0</div>
          
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

      let desc = "Go to step #" + step + " " + this.getMoveCoordinate(current.move);

      if (step === this.props.step) {
        desc = <strong>{desc}</strong>;
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

  getMoveCoordinate(index) {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;

    return ("(" + row + "," + col + ")");
  }
}

export default History;
