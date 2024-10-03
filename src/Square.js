export default function Square({ value, onSquareClick, isHighlight }) {
  return (
    <button className={`square ${isHighlight ? 'active' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}
