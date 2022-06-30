import React from "react";

import './Square.css';

class Square extends React.Component {
  render() {
    const props = this.props;
    const value = props.value ? props.value : <span>&nbsp;&nbsp;</span>;

    return (
      <React.Fragment>
        <button class="square" onClick={props.onClick}>
          {value}
        </button>
      </React.Fragment>
    );
  }
}

export default Square;
