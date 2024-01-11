// PLAYERS
var playerOne;
var playerTwo;


function createPlayer(id, token) {
    var player =  {
        id,
        token,
        wins: 0,
        isWinner: false,
        ticTacs: [],
        isTurn: false,
        combos: [0, 0, 0, 0, 0, 0, 0, 0]
    }
    if (player.id === 'one') {
        player.isTurn = true
        return playerOne = player
    } else {
        return playerTwo = player
    }
}

createPlayer('one', '🦐');
createPlayer('two', '🦩');

function increaseWins(player) {
    player.isWinner = true
    player.wins += 1
    return player
}


var winningCombos = [
[1, 2, 3],
[4, 5, 6],
[7, 8, 9],
[1, 4, 7],
[2, 5, 8],
[3, 6, 9],
[1, 5, 9],
[3, 5, 7] ]

function trackGame(player) {
    for (var i = 0; i < winningCombos.length; i++) {
        player.combos[i] = 0
    for (var x = 0; x < winningCombos[i].length; x++) {
        if (player.ticTacs.includes(winningCombos[i][x])) {
            player.combos[i] += 1
                if (player.combos[i] === 3) {
                    increaseWins(player)
                    showGameResult(player)  
                    console.log('finally a winner')  
                    return 'finally a winner'  
                } 
                }              
        }
    }
    }

function checkForDraw() {
    if (playerOne.ticTacs.length + playerTwo.ticTacs.length === 9) {
        if (!playerOne.isWinner && !playerTwo.isWinner) {
            // return turn.innerText = 'This game is a draw!'
            console.log('this game is a draw')
        }
    }
}

// UPDATING THE GAME BOARD (DOM)
var playerOneScore = document.querySelector('#team-one')
var playerTwoScore = document.querySelector('#team-two')
var gameBoard = document.querySelector('.game-board-container')
var turn = document.querySelector('.game-board-turn')
var square = document.querySelectorAll('.square')
var gameResult = document.querySelector('.game-board-result')


function trackScore(player) {
    if (player.id === 'one') {
        playerOneScore.innerText = `${player.wins} wins`
    } else { playerTwoScore.innerText = `${player.wins} wins`
}
}

gameBoard.addEventListener('click', function(e) {
    if (e.target.classList.contains('square')) {
        addMove(e)
        updateTurn()
    }
})

function updateTurn() {
    if (turn.innerText.includes('🦐')) {
        turn.innerText = 'It\'s 🦩\'s turn!'
        playerOne.isTurn = false
        playerTwo.isTurn = true
    } else {
        turn.innerText = 'It\'s 🦐\'s turn!'
        playerOne.isTurn = true
        playerTwo.isTurn = false
    }
}

function addMove(e) {
    console.log('e.target.id!!!!', e.target)
   if(playerOne.isTurn) {
    playerOne.ticTacs.push(parseInt(e.target.id))
    e.target.innerText = '🦐'
   } else {
    playerTwo.ticTacs.push(parseInt(e.target.id))
    e.target.innerText = '🦩'
   }
   trackGame(playerOne);
   trackGame(playerTwo);
   checkForDraw();
}

function showGameResult(player) {
    if (player.isWinner) {
        trackScore(player)
        gameResult.innerText = `Congrats ${player.token}! You Win!`
        gameResult.classList.toggle('hidden')
        turn.toggleAttribute('hidden')
        console.log('it worked down here too!')
    }
}

// needs to update screen when there's a draw too


