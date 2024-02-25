let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6] 
];

function checkWin() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const cells = document.getElementsByClassName('cell');

        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
        cells[a].style.backgroundColor = 'lightgreen';
        cells[b].style.backgroundColor = 'lightgreen';
        cells[c].style.backgroundColor = 'lightgreen';
        return true;
        }
    }

    return false;
}


function checkTie() {
    return board.every(cell => cell !== '');
}

function handleClick(index) {
    if (board[index] || checkWin()) {
        return;
    }

    board[index] = currentPlayer;
    renderBoard();

    if (checkWin()) {
        setTimeout(() => {
            document.getElementById('result').textContent = 'Победил игрок ' + currentPlayer;
        }, 100);
        return;
    }

    if (checkTie()) {
        setTimeout(() => {
            document.getElementById('result').textContent = 'Ничья!';
        }, 100);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    
    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = board[i];
        cell.addEventListener('click', () => handleClick(i));
        boardElement.appendChild(cell);
    }
}

function startGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    document.getElementById('result').textContent = '';
}

renderBoard();
