import React from "react";

import './Board.css';
import Square from "./Square";

class Board extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Board Component</h1>

        <Square />
      </React.Fragment>
    );
  }
}

export default Board;
