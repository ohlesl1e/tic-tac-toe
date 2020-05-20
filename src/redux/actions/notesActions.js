export const updateGameState = gameState => ({
  type: 'UPDATE_GAME_STATE',
  gameState,
});

export const updatePlayerId = playerId =>({
  type: 'UPDATE_PLAYER_ID',
  playerId
})