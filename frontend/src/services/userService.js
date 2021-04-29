import { httpService } from './http.service';

export const userService = {
  // getUsers,
  // getById,
  // remove,
  // update,
  getLoggedinUser,
  login,
  logout,
  signup,
  addMove
};

window.userService = userService;
// function getUsers() {
//   return httpService.get(`user`);
// }

// function getById(userId) {
//   return httpService.get(`user/${userId}`);
// }
// function remove(userId) {
//   return httpService.delete(`user/${userId}`);
// }

async function update(user) {
  user = await httpService.put(`user/${user._id}`, user);
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
}

function getLoggedinUser() {
  // var value = localStorage['loggedinUser'] || 'null';
  // return JSON.parse(value);
  // return user 
  return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null');
}

function addMove({contact, amount}) {
  const newMove = _getEmptyMove();
  newMove.toId = contact._id;
  newMove.to = contact.name;
  newMove.amount = amount;
  const user = JSON.parse(sessionStorage.getItem('loggedinUser'|| 'null'))
  console.log(user);
  user.moves.push(newMove);
  user.coins -= amount;
  update(user)
  return user;
}

function _getEmptyMove() {
  return {
    toId: '',
    to: '',
    at: Date.now(),
    amount: null,
  };
}




// BETTER ON AUTH.SERVICE SO CAN BE DELETED

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred);
  if (user) return _saveLocalUser(user);
}

async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred);
  return _saveLocalUser(user);
}
async function logout() {
  return await httpService.post('auth/logout');
}

function _saveLocalUser(user) {
  sessionStorage.setItem('loggedinUser', JSON.stringify(user));
  return user;
}
