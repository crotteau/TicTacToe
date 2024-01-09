var playerOne;
var playerTwo;


function createPlayer(id, token, wins) {
    var player =  {
        id,
        token,
        wins: wins || 0
    }
    if (player.id === 'one') {
        return playerOne = player
    } else {
        return playerTwo = player
    }
}

function increaseWins(player) {
    player.wins += 1
    return player
}

var playerOneScore = document.querySelector('#team-shrimp')
var playerTwoScore = document.querySelector('#team-flamingo')

function trackGame(player) {
    if (player.id === 'one') {
    playerOneScore.innerText = `${player.wins} wins`
    } else { playerTwoScore.innerText = `${player.wins} wins`
    }
}
