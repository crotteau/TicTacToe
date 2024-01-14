// PLAYERS
var playerOne;
var playerTwo;

var winningCombos = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]]

function createPlayer(id, token) {
    var player =  {
        id,
        token,
        wins: 0,
        isWinner: false,
        isTurn: false,
        ticTacs: [],
        combos: [0, 0, 0, 0, 0, 0, 0, 0]
    }
    setUpGame(player)
}

createPlayer('one', '🦐');
createPlayer('two', '🦩');

function setUpGame(player) {
    if (player.id === 'one') {
        player.isTurn = true
        return playerOne = player
    } else {
        return playerTwo = player
    }   
}
    
function trackGame(player, target) {
    for (var i = 0; i < winningCombos.length; i++) {
       if (winningCombos[i].includes(target)) {
            player.combos[i] += 1
        }      
    } 
    checkForWinner(player)
    return player
}

function checkForWinner(player) {
    for (var i = 0; i < player.combos.length; i++) {
        if (player.combos[i] === 3) {
            console.log('!! increasing wins', player.id)
            increaseWins(player)
            showWinner(player)   
        } else if (playerOne.ticTacs.length + playerTwo.ticTacs.length === 9) {
            checkForDraw(player);
        }    
    }          
}
    
function increaseWins(player) {
    player.isWinner = true
    player.wins += 1
    return player
}

function checkForDraw(player) {
    if (!playerOne.isWinner && !playerTwo.isWinner) {
        console.log('are you getting here???', player.id)
        showWinner(player);
    }
}


// UPDATING THE GAME BOARD (DOM)
var playerOneScore = document.querySelector('#team-one')
var playerTwoScore = document.querySelector('#team-two')
var gameBoard = document.querySelector('.game-board-container')
var turn = document.querySelector('.game-board-turn')
var square = document.querySelectorAll('.square')
var gameResult = document.querySelector('.game-board-result')
var flamingoWins = document.querySelector('#flamingo-wins')
var shrimpWins = document.querySelector('#shrimp-wins')

function updateScore(player) {
    if (player.id === 'one') {
        playerOneScore.innerText = `${player.wins} wins`
    } else { 
        playerTwoScore.innerText = `${player.wins} wins`
    }   
}

gameBoard.addEventListener('click', function(e) {
    if (e.target.classList.contains('square')) {
        var target = parseInt(e.target.id)
        checkIsUnique(target)
    }
})

function checkIsUnique(target) {
    if (!playerOne.ticTacs.includes(target) && !playerTwo.ticTacs.includes(target)) {
        addMove(target)
    }
}

function addMove(target) {
    if (playerOne.isTurn) {
        playerOne.ticTacs.push(target)
        displayTicTacs(playerOne, playerOne.token)
        trackGame(playerOne, target)
    } else {
        playerTwo.ticTacs.push(target)
        displayTicTacs(playerTwo, playerTwo.token)
        trackGame(playerTwo, target)
    } updateTurn()
}

function displayTicTacs(player, ticTac) {
    for (var i = 0; i < player.ticTacs.length; i++) {
        document.getElementById(player.ticTacs[i]).innerText = ticTac
    }
}

function updateTurn() {
    if (turn.innerText.includes(playerOne.token)) {
        turn.innerText = `It's ${playerTwo.token}'s turn!`
        playerOne.isTurn = false
        playerTwo.isTurn = true
    } else {
        turn.innerText = `It's ${playerOne.token}'s turn!`
        playerOne.isTurn = true
        playerTwo.isTurn = false
    }
}

function toggleDisplays(force1, force2) {
    turn.classList.toggle('hidden', force1)
    gameResult.classList.toggle('hidden', force2)
    gameBoard.classList.toggle('hidden', force1 )
    shrimpWins.classList.toggle('hidden', !playerOne.isWinner)
    flamingoWins.classList.toggle('hidden', !playerTwo.isWinner)
}   

function showWinner(player) {
    if (player.isWinner) {
        updateScore(player)
        gameResult.innerText = `Congrats! ${player.token} wins!`
    } else { 
        console.log('how about here?????', player.id)
        gameResult.innerText = `This game is a draw!`
    }
    toggleDisplays(true, false);
    setTimeout(function () {
        resetBoard(playerOne)
        resetBoard(playerTwo)
        toggleDisplays(false, true)
        }, 4.0 * 1000)
}

function resetBoard(player) {
    displayTicTacs(player, '')
    player.ticTacs = []
    player.combos = [0, 0, 0, 0, 0, 0, 0, 0]
    resetTurn(player)
}

function resetTurn(player) {
    if (player.isWinner) {
        player.isTurn = false
        player.isWinner = false
    } else {
        player.isTurn = true
        turn.innerText = `It's ${player.token}'s turn!`
    }  
}

// check for srp - resetBoard and showWinner
