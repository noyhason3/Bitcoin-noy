import { storageService } from './storageService.js';

export const userService = {
  getUser,
  signUp,
  addMove
};

const USER_KEY = 'loggedinUser';

function getUser() {
  // return Promise.resolve( gUsers[0])
  const user = storageService.load(USER_KEY) || null;
  console.log(user);
  return user
}
// function getUser() {
//   return new Promise((resolve, reject) => {
//     const user = storageService.load(USER_KEY) || null;
//     console.log(user);
//     user ? resolve(user) : reject(`User not found!`)
//   })
// }


const gUsers = [
  {
    name: 'Ochoa Hyde',
    coins: 100,
    moves: [],
  },
];

async function signUp({name}) {
  const newUser = _getEmptyUser();
  newUser.name = name;
  gUsers.push(newUser);
  storageService.store(USER_KEY, newUser);
  return newUser;
}

function addMove({contact, amount}) {
  const newMove = _getEmptyMove();
  newMove.toId = contact._id;
  newMove.to = contact.name;
  newMove.amount = amount;
  const user = storageService.load(USER_KEY);
  user.moves.push(newMove);
  user.coins -= amount;
  storageService.store(USER_KEY, user);
}

function _getEmptyUser() {
  return {
    name: '',
    coins: 100,
    moves: [],
  };
}

function _getEmptyMove() {
  return {
    toId: '',
    to: '',
    at: Date.now(),
    amount: null,
  };
}
