const DEFAULT_STATE = {
  gameState: ['', '', '', '', '', '', '', '', '',],
};

const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_GAME_STATE':
      return {
        ...state,
        gameState: action.gameState,
      };
    default:
      return state;
  }
};

export default notesReducer;
