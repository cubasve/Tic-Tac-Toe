/*------CONSTANTS-------- */
const colors = {
    '1': 'green', //player 1 is green
    '-1': 'blue', //player 2 is blue
    'null': 'white', //when square is empty
}

const winningCombinations = [
    //nested array - contains 3 indices of the board
    [0, 1, 2], //1st row
    [3, 4, 5], //2nd row
    [6, 7, 8], //3rd row
    [0, 3, 6], //1st column
    [1, 4, 7], //2nd column
    [2, 5, 8], //3rd column
    [0, 4, 8], //diagonal: top left to bottom right
    [2, 4, 6], //diagonal: top right to bottom left
]

/*------APP'S STATE (VARIABLES)-------- */
//NOTE: All are just declared, not assigned yet
let board, turn, winner;

/*------CACHED ELEMENT REFERENCES-------- */
const squares = document.querySelectorAll('td div');
const message = document.querySelector('h1');

/*------EVENT LISTENERS-------- */
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', initialize);

/*------FUNCTIONS-------- */

initialize();

function handleMove() {
    
}

//Updates the DOM
function render() {
    board.forEach((square, index) => {
        squares[index].style.background = colors[square];
    });

    if (winner === 'Tie') {
        message.innerHTML = `It's a tie!`;
    } else if (winner) {
        message.innerHTML = `${colors[winner].toUpperCase()} is the winner!`
    } else {
        message.innerHTML = `${colors[turn].toUpperCase()}'s turn`
    }
}

//NOTE: Variables are already declared in app's state section
//Don't redeclare them (let, const) - just assign them (ex. turn = 1)
function initialize() {
    //NOTE: Could also do board = [null, null, null, null, null, null, null, null, null]
    board = new Array(9).fill(null);
    turn = 1; //Player 1 (green) goes first
    winner = null;
    render();
}
