import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { contactReducer } from './reducers/contactReducer';
import { userReducer } from './reducers/userReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  contactReducer,
  userReducer
})

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);
