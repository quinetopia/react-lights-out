import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ 
  nrows=5,
  ncols=5,
  chanceLightStartsOn=0.2}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++){
      let row = [];
      for (let x = 0; x < ncols; x++){
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  // Checks the boaad to see if all the lights are out (i.e. all array elements are false)
  function hasWon(board) {
    // TODO: check the board in state to determine whether the player has won.
      for (let y = 0; y < board.length; y++){
        if (board[y].includes(true)) {
          return false;
        }
      }
    return true;
  }

  // flips the cels around the clicked coords and updates the state of the
  // Board to the flipped Board
  function flipCellsAround(coord) {
      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const boardCopy = [];

      for (let y = 0 ; y < nrows; y++) {
        boardCopy[y] = [...oldBoard[y]]
      }

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
    // flip the clicked coord
    flipCell(y,x,boardCopy)
    //flip the one above
    flipCell(y-1,x, boardCopy)
    //flip the one below
    flipCell(y+1,x, boardCopy)
    //flip the one to the Left
    flipCell(y,x-1, boardCopy)
    //flip the one to the right
    flipCell(y,x+1, boardCopy)

    return boardCopy

    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon(board)) {
    return (
      <div className="Board-winning-msg">You won!</div>
    )
  } else {
    let gameBoard = [];

    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={board[y][x]}
            flipCellsAroundMe={() => flipCellsAround(coord)}/>
        );
      }
      gameBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <div>
        <table className="Board-GameBoard">
          <tbody>
          {gameBoard}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Board;
