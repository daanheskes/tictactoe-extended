export default function checkWinner(board) {
    let horizontalWin = checkHorizontalWin(board),
        verticalWin = checkVerticalWin(board),
        diagonalWin = checkDiagonalWin(board);

    return horizontalWin || verticalWin || diagonalWin;
}

function checkHorizontalWin(board) {
    let winner;

    try {
        board.forEach(y => {
            winner = y.find((x, i) => {
                const previousTile = y[i - 1];
                const nextTile = y[i + 1];
                
                if (!previousTile || !x || !nextTile) return false;
    
                return allEqual([previousTile, x, nextTile]);
            })
            if (winner) {
                throw 'Break';
            }
        })
    } catch (e) {
        if (e !== 'Break') throw e
    }
    return winner;
}

function checkVerticalWin(board) {
    let winner;

    try {
        board.forEach((y, yi) => {
            winner = y.find((x, i) => {
                const previousTile = board[yi - 1] ? board[yi - 1][i]: null;
                const nextTile = board[yi + 1] ? board[yi + 1][i] : null;
                
                if (!previousTile || !x || !nextTile) return false;
    
                return allEqual([previousTile, x, nextTile]);
            })
            if (winner) {
                throw 'Break'; // try { is to workaround break()
            }
        })
    } catch (e) {
        if (e !== 'Break') throw e
    }

    return winner;
}

function checkDiagonalWin(board) {
    let winner;

    try {
        board.forEach((y, yi) => {
            winner = y.find((x, i) => {
                const previousTile = board[yi - 1] ? board[yi - 1][i - 1]: null;
                const nextTile = board[yi + 1] ? board[yi + 1][i + 1] : null;
                
                if (!previousTile || !x || !nextTile) return false;
    
                return allEqual([previousTile, x, nextTile]);
            })
            if (winner) {
                throw 'Break'; // try { is to workaround break()
            }
        })
        board.forEach((y, yi) => {
            winner = y.find((x, i) => {
                const previousTile = board[yi - 1] ? board[yi - 1][i + 1]: null;
                const nextTile = board[yi + 1] ? board[yi + 1][i - 1] : null;
                
                if (!previousTile || !x || !nextTile) return false;
    
                return allEqual([previousTile, x, nextTile]);
            })
            if (winner) {
                throw 'Break'; // try { is to workaround break()
            }
        })
    } catch (e) {
        if (e !== 'Break') throw e
    }

    return winner;
}

function allEqual(arr) {
    return arr.every(x => x === arr[0]);
}
