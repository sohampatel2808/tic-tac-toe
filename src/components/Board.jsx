import React from 'react';

import Square from './Square';

class Board extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div class='board'>
          {this.renderSquares()}
        </div>
      </React.Fragment>
    );
  }

  renderSquares() {
    const props = this.props;

    return props.state.map((square, index) => {
      return <Square gameCompleted={props.gameCompleted} value={props.state[index]} onClick={this.handleClick.bind(this, index)} />
    });
  }

  handleClick(id) {
    this.props.handleClick(id);
  }
}

export default Board;
