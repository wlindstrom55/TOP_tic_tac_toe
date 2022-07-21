const container = document.querySelector('.container'); //change this name, it's misleading
const startButton = document.getElementById('start');
const grid = document.querySelector('.grid'); //the div the squares are displayed on
const msgr = document.querySelector('.messager'); //message display
const score = document.querySelector('.score'); //score display

//as is, the player always leads off. Would be fun once optimal AI works to have it switch between players.
//factory for players, since we need multiple of them. (not as is)
//module for other things, since we only need one gameboard and controller

let countPlay = 1; //the player's turn
let countOpp = 1; //the opponent's turn
let didIWin = 'not yet'; //'not yet', 'Yes', 'No', or 'draw'
let outOfMoves = 'No'; //will be Yes or No, to determine when there are moves left to play


//TO USE, MUST ASSIGN PLAYER TO VARIABLE - since it's a factory pattern
const Player = () => {
    let wins = 0;
    let losses = 0;
    return { wins, losses }
};

const p = Player(); //global, should find a better place

//module for gameboard, since we only need one
const Gameboard = (() => {
    let board = []; 
    const checkWin = () => {
        let count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0;
        let count7 = 0, count8 = 0, count9 = 0, count10 = 0, count11 = 0, count12 = 0;
        let count13 = 0, count14 = 0, count15 = 0, count16 = 0;
        //odd counter is always player, even is opponent
        for(let a = 0; a < 3; a++) { //top row, left to right #1
            if(board[a].getAttribute('played') == 'true') {
                count1++;
            } else if(board[a].getAttribute('played') == 'opp') {
                count2++;
            }
            if(count1 == 3) {
                didIWin = 'Yes'; confirmWin(); return; //condensed for a bit more readability; it's repetitive
            } else if(count2 == 3) {
                didIWin = 'No'; confirmWin(); return;
            }
        }
        for(let b = 3; b < 6; b++) { //middle row, left to right #2
            if(board[b].getAttribute('played') == 'true') {
                count3++;
            } else if(board[b].getAttribute('played') == 'opp') {
                count4++;
            }
            if(count3 == 3) {
                didIWin = 'Yes'; confirmWin(); return;
            } else if(count4 == 3) {
                didIWin = 'No'; confirmWin(); return;
            }
        }
        for(let c = 6; c < 9; c++) { //bottom row, left to right #3
            if(board[c].getAttribute('played') == 'true') {
                count5++;
            } else if(board[c].getAttribute('played') == 'opp') {
                count6++;
            }
            if(count5 == 3) {
                didIWin = 'Yes'; confirmWin(); return;
            } else if(count6 == 3) {
                didIWin = 'No'; confirmWin(); return;
            }
        }
        for(let d = 0; d < board.length; d += 3) { //should check leftmost column, top to bottom (0, 3, 6) #4
            if(board[d].getAttribute('played') == 'true') {
                count7++;
            } else if(board[d].getAttribute('played') == 'opp') {
                count8++;
            }
            if(count7 == 3) {
                didIWin = 'Yes'; confirmWin(); return;
            } else if(count8 == 3) {
                didIWin = 'No'; confirmWin(); return;
            }
        }
        for(let e = 1; e < board.length; e += 3) { //should check middle column, top to bottom (1, 4, 7) #5
            if(board[e].getAttribute('played') == 'true') {
                count9++;
            } else if(board[e].getAttribute('played') == 'opp') {
                count10++;
            }
            if(count9 == 3) {
                didIWin = 'Yes'; confirmWin(); return;
            } else if(count10 == 3) {
                didIWin = 'No';
                confirmWin();
                return;
            }
        }
        for(let f = 2; f < board.length; f += 3) { //should check rightmost column, top to bottom #6
            if(board[f].getAttribute('played') == 'true') {
                count11++;
            } else if(board[f].getAttribute('played') == 'opp') {
                count12++;
            }
            if(count11 == 3) {
                didIWin = 'Yes'; confirmWin(); return;
            } else if(count12 == 3) {
                didIWin = 'No'; confirmWin(); return;
            }
        }
        for(let g = 0; g < board.length; g += 4) { //should check diagonally, left to right downwards (0, 4, 8) #7
            if(board[g].getAttribute('played') == 'true' ) {
                count13++;
            } else if(board[g].getAttribute('played') == 'opp') {
                count14++;
            }
            if(count13 == 3) {
                didIWin = 'Yes'; confirmWin(); return;
            } else if(count14 == 3) {
                didIWin = 'No'; confirmWin(); return;
            }
        }
        for(let h = 2; h < board.length - 2; h += 2) { //should check diagonally, right to left downwards (2, 4, 6) #8
            if(board[h].getAttribute('played') == 'true') {
                count15++;
            } else if(board[h].getAttribute('played') == 'opp') {
                count16++;
            }
            if(count15 == 3) {
                didIWin = 'Yes'; confirmWin(); return;
            } else if(count16 == 3) {
                didIWin = 'No'; confirmWin(); return;
            }
        }
    }

    const initiateDraw = () => {
        if(outOfMoves == 'Yes') {
            msgr.innerHTML = 'There was a draw!';
            didIWin = 'draw';
        } else {
            msgr.innerHTML = 'The sophisticated AI has malfunctioned';
        }
    }

    const confirmWin = () => {
        if(didIWin == 'not yet'){
            msgr.innerHTML = 'Who could possibly win!?';
        } else if(didIWin == 'No') {
            msgr.innerHTML = 'You LOSE!';
            p.losses++;
        } else if(didIWin == 'Yes') {
            msgr.innerHTML = 'You WIN!';
            p.wins++;
        }
    }

    const opponentPlay = () => {
        let q = 0; //q will prevent infinite loops and be ONE of TWO checks to see if there is a draw.
        const rando = (max) => {
            return Math.floor(Math.random() * max);
        };
        for(let x = 0; board.length - 1; x++) {
            let oppChoice = board[rando(8)];
            if(oppChoice.getAttribute('played') == 'false') {
                oppChoice.innerHTML = 'O';
                oppChoice.setAttribute('played', 'opp');
                countOpp++;
                checkWin();
                return;
            } else if(q == 50) { //if loop makes it to 50, let's say there probably isn't another button left to play 
                if(oppChoice.getAttribute('played') == ('true') || ('opp')) {
                    initiateDraw(); //call draw condition
                    return;
                }
            } else if(oppChoice.getAttribute('played') == 'true') {
                x -= 1;
                q++;
            } else if(oppChoice.getAttribute('played') == 'opp') {
                x -= 1;
                q++;
            }
        }
    }
    return { board, checkWin, opponentPlay, confirmWin };
})();

//displayController - will control the flow of the game - renders the contents of the board to the page
const displayController = (() => {
    const popBoard = () => { //would be cool to adjust size somehow
        let displayCount = 1;
        let toDelete = document.querySelector('.grid');
        toDelete.remove(); //checks for existing grid (in DOM) and removes before recreating. to help reset board.
        let grid = document.createElement('div');
        grid.classList.add('grid');
        container.append(grid);
        while (displayCount <= 9) {
            let square = document.createElement('button');
            square.setAttribute('id', `square${displayCount}`);
            square.setAttribute('name', `square${displayCount}`);
            square.setAttribute('played', 'false');
            square.classList.add('square');
            square.innerHTML = `${" "}`; //default square value
            grid.append(square);
            Gameboard.board.push(square); //added to array here
            square.addEventListener('click', () => {
                if(square.getAttribute('played') == 'true') {
                    msgr.innerHTML = 'You already played there dog, try again';
                    return;
                }
                if(square.getAttribute('played') == 'false') {
                    square.setAttribute('played', 'true');
                    play(square);
                }
                
            });
            displayCount++;
        }
        grid.style.gridTemplateColumns = `repeat(3, 1fr)`; 
        grid.style.gridTemplateRows = `repeat(3, 1fr)`;
    }
    
    const play = (square) => {
        //need some way to choose the Xs or Os. maybe a button?
        if((square.getAttribute('played') == 'true') ) {
            square.innerHTML = 'X';
            countPlay++;
            if(countPlay > 3) {
                Gameboard.checkWin();
            }
            if(didIWin == 'not yet') { //keeps opponent from continuously playing after a win or loss.
                Gameboard.opponentPlay();
            }
            if (countPlay > 4) { //if you're playing your 4th, then allow ONE of TWO draw conditions
                outOfMoves = 'Yes';
            } 
        } else if (square.getAttribute('played') == 'opp') {
            msgr.innerHTML = "You can't play where an opponent has!";
        }
        
    }
    const updateScore = () => {
        score.innerHTML = `You currently have ${p.wins} wins, ${p.losses} losses!`
    }
    return { popBoard , play , updateScore }
})();

startButton.addEventListener('click', () => {
    Gameboard.board.splice(0,Gameboard.board.length); //this will empty the array
    displayController.popBoard();
    msgr.innerHTML = 'Who Will Win?';
    displayController.updateScore();
    //below here, reset global variables
    countPlay = 1;
    countOpp = 1;
    didIWin = 'not yet';
    outOfMoves = 'No';
});
