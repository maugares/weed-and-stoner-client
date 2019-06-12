export const findX = (board) => {
  const arrX = []
  const arrXs = []
  for (let row = 0; row < board.length; row++) {
    for (let cell = 0; cell < board[row].length; cell++) {
      if (board[row][cell] === 'x') {
        arrX.push([row, cell])
        arrXs.push(`[${row},${cell}]`)
      }
    }
  }
  return { arrX, arrXs }
}

export const findO = (board) => {
  const arrX = []
  const arrXs = []
  for (let row = 0; row < board.length; row++) {
    for (let cell = 0; cell < board[row].length; cell++) {
      if (board[row][cell] === 'o') {
        arrX.push([row, cell])
        arrXs.push(`[${row},${cell}]`)
      }
    }
  }
  return { arrX, arrXs }
}

export const symbolArray = (obj, size) => {
  const { arrX, arrXs } = obj
  const posRaw = []
  for (let i = 0; i < arrX.length; i++) {
    let row = arrX[i][0]
    let col = arrX[i][1]

    const arr = [
      row - 1 > -1 ? posRaw.push(`${[row - 1, col]}`) : null,
      row + 1 < (size+1) ? posRaw.push(`${[row + 1, col]}`) : null,
      col - 1 > - 1 ? posRaw.push(`${[row, col - 1]}`) : null,
      col + 1 < (size+1) ? posRaw.push(`${[row, col + 1]}`) : null
    ]
  }

  const unique = [...new Set(posRaw)]
    .map(u => {
      if (arrXs.includes(`[${u}]`)) {
        return null
      } else {
        const split = u.split(",")
        return [parseInt(split[0]), parseInt(split[1])]
      }
    })
    .filter(u => u != null)
  return [unique]
}