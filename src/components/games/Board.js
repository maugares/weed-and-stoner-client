import React from 'react'
import './Board.css'
import { findX, findO, symbolArray } from './Validation'

const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn, foundX, nextCells, blockedCells, foundO) => {
  const nextCell = nextCells[0]

  const possibleArray = nextCell.map(possibility => {
    const possibleArray =
      possibility[0] === rowIndex &&
      possibility[1] === cellIndex
    return possibleArray
  })

  // const getArray = (found) => {
  //   const array = found
  //   array.arrX.map(element => {
  //     const elementArray =
  //       element[0] === rowIndex &&
  //       element[1] === cellIndex
  //     return elementArray
  //   })
  // }

  const chosenArray = foundX.arrX.map(chosen => {
    const chosenArray =
      chosen[0] === rowIndex &&
      chosen[1] === cellIndex
    return chosenArray
  })

  const blockedArray = foundO.arrX.map(blocked => {
    const blockedArray =
      blocked[0] === rowIndex &&
      blocked[1] === cellIndex
    return blockedArray
  })

  const isPossible = possibleArray.indexOf(true) > -1
  const isChosen = chosenArray.indexOf(true) > -1
  const isBlocked = blockedArray.indexOf(true) > -1

  if (chosenArray.length === 0) {
    return (
      <button
        className="board-tile-possible"
        disabled={hasTurn}
        onClick={() => makeMove(rowIndex, cellIndex)}
        key={`${rowIndex}-${cellIndex}`}
      >{symbol || '-'}</button>
    )
  } else if (isChosen) {
    return (
      <button
        className="board-tile-chosen"
        disabled={hasTurn}
        key={`${rowIndex}-${cellIndex}`}
      >{symbol || '-'}</button>
    )
  } else if (isBlocked) {
    return (
      <button
        className="board-tile-blocked"
        disabled={hasTurn}
        key={`${rowIndex}-${cellIndex}`}
      >{symbol || '-'}</button>
    )
  } else if (isPossible) {
    return (
      <button
        className="board-tile-possible"
        disabled={hasTurn}
        onClick={() => makeMove(rowIndex, cellIndex)}
        key={`${rowIndex}-${cellIndex}`}
      >{symbol || '-'}</button>
    )
  } else if (!isPossible) {
    return (
      <button
        className="board-tile"
        disabled={hasTurn}
        key={`${rowIndex}-${cellIndex}`}
      >{symbol || '-'}</button>
    )
  }
}

export default ({ game, makeMove }) => game.board.map((cells, rowIndex) => {
  const foundX = findX(game.board)
  const nextCells = symbolArray(foundX, cells.length)
  const foundO = findO(game.board)
  const blockedCells = symbolArray(foundO, cells.length)
  return < div key={rowIndex} >
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex, symbol, false, foundX, nextCells, blockedCells, foundO))}
  </div >
})