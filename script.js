let gameInfo = document.getElementById('gameInfo');
let clearBtn = document.getElementById('clearBtn');

// Creates an array from the cells in the DOM
let cells = Array.from(document.getElementsByClassName('cell'));

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
// forces start of game to have 9 empty spaces
let spaces = Array(9).fill(null);
let turns = 0;

let winnerCellHighlight = getComputedStyle(document.body).getPropertyValue('--winningCells');

let startGame = () => {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
}

function cellClicked(e) {
    let id = e.target.id;

    if(!spaces[id] && turns < 9){  //Checks null space for an Id
        spaces[id] = currentPlayer;    //Fills the space with which ever players assigned TEXT
        e.target.innerText = currentPlayer;  //Gives feedback to user in DOM

        if(playerWins() !==false) {
            gameInfo.innerHTML = `${currentPlayer} wins!`;
            let winningCells = playerWins();
            turns = 10;

            winningCells.map(cell => cells[cell].style.backgroundColor=winnerCellHighlight);  //adds the background style to highlight the winning character's cells if won
            return;
        }
        turns++;
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }

    if(turns === 9) {
        gameInfo.innerHTML = "It's a DRAW!";
        cells.forEach(cell => cell.style.backgroundColor=winnerCellHighlight);
    }
}

let toWinCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];


function playerWins() {
    for(let condition of toWinCombos) {
        let [a, b, c] = condition;

        if(spaces[a] && (spaces[a] == spaces [b] && spaces[a] === spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

clearBtn.addEventListener('click', clear);

function clear() {
    spaces.fill(null);
    turns = 0;
    cells.forEach( cell => {
        cell.innerText = '';
        cell.style.backgroundColor='';
    })

    gameInfo.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TEXT;

}

startGame();

