import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    const handleClick = (index) => {
        if (squares[index] || calculateWinner(squares)) return;
        const newSquares = squares.slice();
        newSquares[index] = xIsNext ? "X" : "O";
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    };

    const winner = calculateWinner(squares);
    const status = winner
        ? `Winner: ${winner}`
        : `Next player: ${xIsNext ? "X" : "O"}`;

    return (
        <>
            <div className="status">{status}</div>
            <div className="board">
                {squares.map((square, index) => (
                    <Square
                        key={index}
                        value={square}
                        onSquareClick={() => handleClick(index)}
                    />
                ))}
            </div>
            <button style={{ marginTop: "1rem" }} onClick={resetGame}>
                Reset Game
            </button>
        </>
    );
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
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
