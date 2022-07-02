import React from 'react';

class Square extends React.Component {
  render() {
    const props = this.props;

    return (
      <React.Fragment>
        <button class='square' disabled={props.gameCompleted} onClick={props.onClick}>
          {props.value}
        </button>
      </React.Fragment>
    );
  }
}

export default Square;
