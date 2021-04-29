import { userService } from '../../services/userService';

// export function signUp({fullname, username, password}) {
export function signUp(userCred) {
  return async (dispatch) => {
    const user = await userService.signup(userCred);
    dispatch({ type: 'SET_USER', user });
  };
}

export function login({ username, password}) {
  return async (dispatch) => {
    const userCred = { username, password}
    const user = await userService.login(userCred);
    dispatch({ type: 'SET_USER', user });
  };
}

export function transferCoins({contact,amount}) {
  return async (dispatch) => {
    const user = await userService.addMove({contact,amount});
    console.log(user);
    dispatch({ type: 'SET_USER', user });
  };
}

// export function loadUser() {
//   return async (dispatch) => {
//     const user = await userService.getLoggedinUser();
//     console.log(user);
//     const action = {
//       type: 'SET_USER', user 
//    }
//     dispatch(action);
//   };
// }
