import { useState } from 'react';
import Square from "./Square.js";

const numOfCols = 3;

function Board({ xIsNext, squares, onPlay }) {
  const [winningCombo, setWinningCombo] = useState([]);
  if (JSON.stringify(winningCombo) !== JSON.stringify(calculateWinner(squares))) {
    setWinningCombo(calculateWinner(squares));
  }

  function handleClick(i) {
    if (squares[i] || winningCombo.length > 0) return;
    const nextSquares = squares.slice(); // get a copy of squares

    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  let status;
  if (winningCombo.length > 0) {
    const winner = squares[winningCombo[0]]
    status = "Winner: " + winner;
  } else if (isDraw(squares)) {
    status = "Game draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const rows = [];
  for (let row = 0; row < 3; row++) {
    rows.push(<div className="board-row">{generateSquares(row, squares, handleClick, winningCombo)}</div>);
  }

  return (
    <>
      <div className="status">{ status }</div>
      { rows }
    </>
  );
}

function generateSquares(row, squares, handleClick, winningCombo) {
  const squaresComponents = [];
  for (let col = 0; col < numOfCols; col++) {
    const adjustedCol = (row * numOfCols)  + col;
    const highlight = winningCombo.includes(adjustedCol);
    squaresComponents.push(<Square value={squares[adjustedCol]} onSquareClick={() => handleClick(adjustedCol)} highlight={highlight} />)
  }
  return squaresComponents;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return [];
}

function isDraw(squares) {
  return squares.every(s => s === "X" || s === "O" ? true : false);
}

export default Board;

