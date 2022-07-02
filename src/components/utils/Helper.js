export function calculateWinner(state) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return state[a];
    }
  }

  return null;
}

export function checkForDraw(state) {
  for (let i = 0; i < state.length; i++) {
    if (state[i] === null) {
      return false;
    }
  }

  return true;
}

export function getMoveCoordinate(index) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;

  return `(${row},${col})`;
}
