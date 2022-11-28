import { useState, useEffect } from 'react';
import './App.scss'

import checkWinner from './functions/checkWinner';

function App() {
  const MINIMUM_BOARD_SIZE = 3;
  const MAXIMUM_BOARD_SIZE = 12;
  const DEFAULT_BOARD_SIZE = 3;

  const [currentPlayer, setCurrentPlayer] = useState();
  const [winner, setWinner] = useState(null);
  const [boardSize, setBoardSize] = useState(DEFAULT_BOARD_SIZE);
  const [board, setBoard] = useState([]);

  useEffect(() => {
    init();
  }, [boardSize])

  function init() {
    setWinner(null);
    setCurrentPlayer("X");
    createBoard(boardSize);
  }

  function createBoard(n) {
    let sArr = [];

    for (let i = 0; i < n; i++) { // create y
      sArr[i] = Array(n).fill(); // create X
    }

    setBoard(sArr);
  }

  function handleSetMove({ x, y }) {
    if (winner) return;
    if (board[y][x]) return; // Already set

    const boardCopy = [...board];
    boardCopy[y][x] = currentPlayer;

    setBoard(boardCopy);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    const playerWhoWon = checkWinner(boardCopy);
    if (playerWhoWon) {
      setWinner(playerWhoWon);
    }
  }

  function handleChangeBoardSize(newBoardSize) {
    if (newBoardSize >= MINIMUM_BOARD_SIZE && newBoardSize <= MAXIMUM_BOARD_SIZE) {
      setBoardSize(newBoardSize);
    }
  }

  return (
    <div className="App">
      <div className="options">
        <button onClick={() => handleChangeBoardSize(boardSize - 1)}>-</button>
        <p className="board-size">{boardSize}</p>
        <button onClick={() => handleChangeBoardSize(boardSize + 1)}>+</button>
      </div>
      {
        winner ? <span>Winner: {winner}<button onClick={init}>Restart</button></span> : <span>Player to move: {currentPlayer}</span>
      }
        <div className="board">
        {
          board.map((y, yi) => {
            return <div key={yi} className="row">
              {
                y.map((x, xi) => {
                  return <div key={xi} className="tile" onClick={() => handleSetMove({y: yi, x: xi})}>{x}</div>
                })
              }
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App
