import { useState } from 'react';
import Board from "./Board.js";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [order, setOrder] = useState("asc");

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleOrder() {
    let newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move === currentMove) {
      description = move === 0 ? "You are at game start" : ("You are at move #" + move);
    } else if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button className="order-btn" onClick={toggleOrder}>Change order</button>
        <ol>{order === "asc" ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}

