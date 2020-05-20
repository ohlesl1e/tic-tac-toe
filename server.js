const WebSocket = require('ws');
const express = require('express')
const app = express()
const port = 5000

const wss = new WebSocket.Server({ port: 4000 });

wss.on('connection', ws => {
  console.log('someone has connected')
  broadcastGameState()

  ws.on('close', () => {
    console.log('connection closed');
    gameState = ['', '', '', '', '', '', '', '', '',]
  })
})

let gameState = ['', '', '', '', '', '', '', '', '',];

const checkEqual = (x, y, z) => {
  return (x === y && y === z)
}

const checkWinner = game => {
  if (checkEqual(game[0], game[1], game[2])) {
    return game[0]
  }
  if (checkEqual(game[3], game[4], game[5])) {
    return game[3]
  }
  if (checkEqual(game[6], game[7], game[8])) {
    return game[6]
  }
  if (checkEqual(game[0], game[3], game[6])) {
    return game[0]
  }
  if (checkEqual(game[1], game[4], game[7])) {
    return game[1]
  }
  if (checkEqual(game[2], game[5], game[8])) {
    return game[2]
  }
  if (checkEqual(game[0], game[4], game[8])) {
    return game[0]
  }
  if (checkEqual(game[2], game[4], game[6])) {
    return game[2]
  }
  return null
}

const broadcastGameState = () => {
  console.log(gameState)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'UPDATE_GAME_STATE',
        gameState,
      }))
    }
  })
}

app.get('/api/play', (req, res) => {
  console.log(req.query)
  let playerId = 0
  if (gameState[req.query.position] === '') {
    if (req.query.playerId === 'null') {
      gameState[req.query.position] = 1
      playerId = 2
    } else if (req.query.playerId === '1') {
      gameState[req.query.position] = parseInt(req.query.playerId)
      playerId = 2
    } else {
      gameState[req.query.position] = parseInt(req.query.playerId)
      playerId = 1
    }
  }

  broadcastGameState()
  const winner = parseInt(checkWinner(gameState))
  res.send({ playerId, winner });
})

app.get('/api/reset', (req, res) => {
  gameState = ['', '', '', '', '', '', '', '', '',];
  broadcastGameState()
  res.send('');
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))