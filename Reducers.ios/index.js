/*

reducers

*/

import { combineReducers } from 'redux';
import { login } from './login.js';
const reducer = combineReducers({
  login: login,
})

export default reducer ;
