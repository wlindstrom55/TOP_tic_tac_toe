const container = document.querySelector('.container'); //change this name, it's misleading
const startButton = document.getElementById('start');
const grid = document.querySelector('.grid'); //the div the squares are displayed on
const msgr = document.querySelector('.messager'); //message display
const score = document.querySelector('.score'); //score display

//factory for players, since we need multiple of them.
//module for other things, since we only need one gameboard and controller
//TO USE, MUST ASSIGN PLAYER TO VARIABLE
const Player = () => {
    let wins = 0;
    let losses = 0;
    //we want player name, a score after wins, methods to change scoreboard?
    // const changeScore = (result) => {
    //     if(result == 'Win') {
    //         return wins++;
    //     }
    //     if(result == 'Loss') {
    //         return losses++;
    //     }
    // }
    return { wins, losses }
};

const p = Player();

//module for gameboard, since we only need one
const Gameboard = (() => {
    let board = []; 
    let didIWin = 'not yet';
    const checkWin = () => {
        for(let a = 0; a < 3; a++) { //top row, left to right #1
            let count1 = 0, count2 = 0;
            if(board[a].getAttribute('played') == 'true') {
                count1++;
            }
            if(board[a].getAttribute('played') == 'opp') {
                count2++;
            }
            if(count1 == 3) {
                didIWin = 'Yes';
            }
            if(count2 == 3) {
                didIWin = 'No';
            }else {
                continue;
            }
        }
        for(let b = 3; b < 6; b++) { //middle row, left to right #2
            let count3 = 0, count4 = 0;
            if(board[b].getAttribute('played') == 'true' ) {
                count3++;
            }
            if(board[b].getAttribute('played') == 'opp') {
                count4++;
            }
            if(count3 == 3) {
                didIWin = 'Yes';
            }
            if(count4 == 3) {
                didIWin = 'No';
            }else {
                continue;
            }
        }
        for(let c = 6; c < 9; c++) { //bottom row, left to right #3
            let count5 = 0, count6 = 0;
            if(board[c].getAttribute('played') == 'true' ) {
                count5++;
            }
            if(board[c].getAttribute('played') == 'opp') {
                count6++;
            }
            if(count5 == 3) {
                didIWin = 'Yes';
            }
            if(count6 == 3) {
                didIWin = 'No';
            }else {
                continue;
            }
        }
        for(let d = 0; d < board.length; d += 3) { //should check leftmost column, top to bottom #4
            let count7 = 0, count8 = 0;
            if(board[d].getAttribute('played') == 'true' ) {
                count7++;
            }
            if(board[d].getAttribute('played') == 'opp') {
                count8++;
            }
            if(count7 == 3) {
                didIWin = 'Yes';
            }
            if(count8 == 3) {
                didIWin = 'No';
            }else {
                continue;
            }
        }
        for(let e = 1; e < board.length; e += 3) { //should check middle column, top to bottom #5
            let count9 = 0, count10 = 0;
            if(board[e].getAttribute('played') == 'true' ) {
                count9++;
            }
            if(board[e].getAttribute('played') == 'opp') {
                count10++;
            }
            if(count9 == 3) {
                didIWin = 'Yes';
            }
            if(count10 == 3) {
                didIWin = 'No';
            }else {
                continue;
            }
        }
        for(let f = 2; f < board.length; f += 3) { //should check rightmost column, top to bottom #6
            let count11 = 0, count12 = 0;
            if(board[f].getAttribute('played') == 'true' ) {
                count11++;
            }
            if(board[f].getAttribute('played') == 'opp') {
                count12++;
            }
            if(count11 == 3) {
                didIWin = 'Yes';
            }
            if(count12 == 3) {
                didIWin = 'No';
            }else {
                continue;
            }
        }
        for(let g = 0; g < board.length; g += 4) { //should check diagonally, left to right downwards (0, 4, 8) #7
            let count13 = 0, count14 = 0;
            if(board[g].getAttribute('played') == 'true' ) {
                count13++;
            }
            if(board[g].getAttribute('played') == 'opp') {
                count14++;
            }
            if(count13 == 3) {
                didIWin = 'Yes';
            }
            if(count14 == 3) {
                didIWin = 'No';
            }else {
                continue;
            }
        }
        for(let h = 2; h < board.length -1; h += 2) { //should check diagonally, right to left downwards (2, 4, 6) #8
            //length -1 here to avoid picking up the last array square
            let count15 = 0, count16 = 0;
            if(board[h].getAttribute('played') == 'true' ) {
                count15++;
            }
            if(board[h].getAttribute('played') == 'opp') {
                count16++;
            }
            if(count15 == 3) {
                didIWin = 'Yes';
            }
            if(count16 == 3) {
                didIWin = 'No';
            }else {
                continue;
            }
        }
        if(didIWin == 'draw'){
            msgr.innerHTML = 'There was a draw!';
        } //some way here to check for draw
        if(didIWin == 'not yet'){
            msgr.innerHTML = 'So far, no winner!';
        }
        if(didIWin == 'No') {
            msgr.innerHTML = 'You LOSE!';
            //setTimeout(); //something here to delay before starting a new game?
            //p.changeScore('Loss');
            p.losses++;
            didIWin = 'not yet';
        }
        if(didIWin == 'Yes') {
            msgr.innerHTML = 'You WIN!';
            //p.changeScore('Win');
            didIWin = 'not yet';
            p.wins++;
        }
    }

    const opponentPlay = () => {
        let countOpp = 0;
        const rando = (max) => {
            return Math.floor(Math.random() * max);
        };
        const oppChoice = board[rando(8)];
        if(oppChoice.getAttribute('played') == 'false') {
            oppChoice.setAttribute('played', 'opp');
            oppChoice.innerHTML = 'O';
            //if(countOpp > 2) {
                checkWin(); //checkWin after opponent successfully plays
            //}
        } else if (countOpp < 9) { //keeps from looping itself infinitely(?)
            opponentPlay(); //well, look again
            countOpp++;
        }
    }
    return { board, checkWin, opponentPlay, didIWin };
})();

//displayController - will control the flow of the game - renders the contents of the board to the page
const displayController = (() => {
    let countPlay = 0;
    const popBoard = () => { //would be cool to adjust size somehow
        let count = 1;
        let toDelete = document.querySelector('.grid');
        toDelete.remove(); //checks for existing grid and removes before recreating. to reset board.
        let grid = document.createElement('div');
        grid.classList.add('grid');
        container.append(grid);
        while (count <= 9) {
            let square = document.createElement('button');
            square.setAttribute('id', `square${count}`);
            square.setAttribute('name', `square${count}`);
            square.setAttribute('played', 'false');
            square.classList.add('square');
            square.innerHTML = `${count}`; //change at some point to default value, maybe no char
            grid.append(square);
            Gameboard.board.push(square); //could encapsulate gameboard better. maybe a method that pushes
            square.addEventListener('click', () => {
                if(square.getAttribute('played') == 'false') {
                    square.setAttribute('played', 'true');
                }
                play(square);
            });
            count++;
        }
        grid.style.gridTemplateColumns = `repeat(3, 1fr)`; 
        grid.style.gridTemplateRows = `repeat(3, 1fr)`;
    }
    const c = () => {

    }
    const play = (square) => {
        //need some way to choose the Xs or Os. maybe a button?
        if(square.getAttribute('played') == 'true') { //should freeze button after playing.
            square.innerHTML = 'X';
            countPlay++;
            if(countPlay > 3) {
                Gameboard.checkWin();
                // we need to only call this after 3 player turns, to update variables correctly (?)
                //square.setAttribute('played', 'true'); //now we do this within the square button itself
            }
            if(countPlay < 5) {
                Gameboard.opponentPlay(); //attempt to keep opponent from continuously playing after a win or loss.
            }
        } else {
           //do nothing, don't allow the button press to do a thing
        }
    }
    const updateScore = () => {
        // let w = p.wins;
        // let l = p.losses;
        score.innerHTML = `You currently have ${p.wins} wins, ${p.losses} losses!`
    }
    return { popBoard , play , updateScore }
})();

startButton.addEventListener('click', () => {
    displayController.popBoard(); //clears and resets the game board
    msgr.innerHTML = 'Who Will Win?';
    //Gameboard.checkWin.didIWin = 'not yet'; //does this work?
    //Gameboard.didIWin = 'not yet';
    //need some way to reset the value...
    displayController.updateScore();
});
