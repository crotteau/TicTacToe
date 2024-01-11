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
                    } 
        }
    }
    } 
}

// sort into ascending order and repeatedly check if tics array contains a winning combo

// UPDATING THE GAME BOARD (DOM)
var playerOneScore = document.querySelector('#team-shrimp')
var playerTwoScore = document.querySelector('#team-flamingo')
var gameBoard = document.querySelector('.container')
var turn = document.querySelector('.turn')
var square = document.querySelectorAll('.square')

function trackScore(player) {
    if (player.id === 'one') {
        playerOneScore.innerText = `${player.wins} wins`
    } else { playerTwoScore.innerText = `${player.wins} wins`
}
}

gameBoard.addEventListener('click', function(e) {
    if (e.target.classList.contains('square')) {
        addMove(e)
        toggleTurn()
    }
})

function toggleTurn() {
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
}
