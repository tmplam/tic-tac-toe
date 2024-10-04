import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      coords: null,
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [historyIsAsc, setHistoryIsAsc] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextStep) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextStep];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSortHistory() {
    setHistoryIsAsc((prev) => !prev);
  }

  let moves = history.map((step, move) => {
    let element = null;
    if (currentMove == move) {
      element = (
        <span className="current-text">
          {move === 0 ? 'You are at game start' : `You are at move #${move} - ${step.coords}`}
        </span>
      );
    } else if (move > 0) {
      element = (
        <button onClick={() => jumpTo(move)}>{`Go to move #${move} - ${step.coords}`}</button>
      );
    } else {
      element = <button onClick={() => jumpTo(move)}>Go to game start</button>;
    }
    return <li key={move}>{element}</li>;
  });

  if (!historyIsAsc) moves = moves.reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} step={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={toggleSortHistory}>{historyIsAsc ? 'Desc' : 'Asc'}</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
