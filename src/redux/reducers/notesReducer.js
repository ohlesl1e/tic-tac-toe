const DEFAULT_STATE = {
  gameState: ['', '', '', '', '', '', '', '', '',],
  playerId: null
};

const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_GAME_STATE':
      return {
        ...state,
        gameState: action.gameState,
      };
    case 'UPDATE_PLAYER_ID':
      return {
        ...state,
        playerId: action.playerId,
      };
    default:
      return state;
  }
};

export default notesReducer;
