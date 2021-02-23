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

function handleMove(event) {
    //Get the index of the square
    //id is 'square0' - only want the number
    //replace 'square' with an empty string
    const index = parseInt(event.target.id.replace('square', ''));
    //Check if square is available and return if not
    if (board[index] || winner) return;

    board[index] = turn;
    turn *= -1; //turn = turn * -1
    winner = getWinner();
    render();
}

function getWinner() {
    //OPTION 1: We have a winner
    for (let i = 0; i < winningCombinations.length; i++) {
        if (Math.abs(
            board[winningCombinations[i][0]] +
            board[winningCombinations[i][1]] +
            board[winningCombinations[i][2]] === 3
        )) {
            return board[winningCombinations[i][0]];
        }
    }
    /* Less elegant approach:
    if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
    if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
    if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
    if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
    if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
    if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
    if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
    if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
    */

    //OPTION 2: Game is still going - no winner yet
    if (board.includes(null)) return null;
    
    //OPTION 3: It's a tie
    return 'Tie';
}

//Updates the DOM
function render() {
    board.forEach((square, index) => {
        squares[index].style.background = colors[square];
    });

    if (winner === 'Tie') {
        message.innerHTML = `It's a tie!`;
    } else if (winner) {
        // let color = colors[winner];
        message.innerHTML = `<span style="color:${colors[winner]}">${colors[winner].toUpperCase()}</span> is the winner!`
    } else {
        // let color = colors[turn];
        message.innerHTML = `<span style="color:${colors[turn]}">${colors[turn].toUpperCase()}'s</span> turn`
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
