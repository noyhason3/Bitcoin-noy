const INITIAL_STATE = {
  currUser: null,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USER':
      console.log(action);
      return {
        ...state,
        currUser: action.user,
      };
    default:
      return state;
  }
}
