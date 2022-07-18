const container = document.querySelector('.container');
const startButton = document.getElementById('start');
const grid = document.querySelector('.grid');
const sq1 = document.getElementById('square1');
const sq2 = document.getElementById('square2');
const sq3 = document.getElementById('square3');
const sq4 = document.getElementById('square4');
const sq5 = document.getElementById('square5');
const sq6 = document.getElementById('square6');
const sq7 = document.getElementById('square7');
const sq8 = document.getElementById('square8');
const sq9 = document.getElementById('square9');

//store the gameboard as an array inside of a Gameboard object
//factory for players, since we need multiple of them.
const Player = (name) => {
    
};

//module for gameboard, since we only need one
const Gameboard = (() => {
    let board = [];
    //maybe methods for changing board here?
    const checkWin = () => {
        //check for 3 in a row, OR a tie (noone gets 3 in a row?)
    }
    const checkPlay = () => {
        //if spot is taken, can't play there. maybe return an error?
    }
    return { board };
})();

//displayController - will control the flow of the game - renders the contents of the board to the page
const displayController = (() => {
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
            //const played = false;
            // square[played] = false;
            grid.append(square);
            Gameboard.board.push(square);
            square.addEventListener('click', () => {
                play(square);
            });
            count++;
        }
        grid.style.gridTemplateColumns = `repeat(3, 1fr)`; 
        grid.style.gridTemplateRows = `repeat(3, 1fr)`;
    }
    const checkPlay = () => {

    }
    const play = (square) => {
         //let num = squareNum.slice(-1,1);
        //console.log(`${square}`);
        if(square.getAttribute('played') == 'false') { //should freeze button after playing. TODO created played boolean
            //change the innerHTML of button, check to see if someone has won,
            square.innerHTML = 'X';
            square.setAttribute('played', 'true');
        } else {
            //do nothing, don't allow the button press to do a thing
        }
    }

    return { popBoard , play }
})();

startButton.addEventListener('click', () => {
    displayController.popBoard(); //need some way to keep from being pressed while game is in play, or maybe it clears and resets the game
});
