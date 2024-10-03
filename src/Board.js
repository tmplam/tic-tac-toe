import Square from './Square';

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        winLine: lines[i].slice(),
      };
    }
  }
  return null;
}

function fullBoard(squares) {
  return squares.findIndex((x) => x == null) === -1;
}

export default function Board({ xIsNext, step: { squares }, onPlay, boardSize = 3 }) {
  function handleClick(i, coords) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay({
      squares: nextSquares,
      coords: coords,
    });
  }

  const winner = calculateWinner(squares);
  const draw = fullBoard(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner.player;
  } else if (draw) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {Array(boardSize)
        .fill(null)
        .map((_, rowIndex) => {
          return (
            <div key={rowIndex} className="board-row">
              {Array(boardSize)
                .fill(null)
                .map((_, colIndex) => {
                  const index = rowIndex * boardSize + colIndex;
                  const squareCoords = `(${rowIndex + 1}, ${colIndex + 1})`;
                  return (
                    <Square
                      isHighlight={
                        squares[index] === winner?.player &&
                        winner?.winLine.findIndex((x) => x === index) !== -1
                      }
                      key={squareCoords}
                      value={squares[index]}
                      onSquareClick={() => handleClick(index, squareCoords)}
                    />
                  );
                })}
            </div>
          );
        })}
    </>
  );
}
