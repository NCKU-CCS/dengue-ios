/*

reducers

*/

import { combineReducers } from 'redux';
import { login } from './login.js';
import { status } from './status.js';
const reducer = combineReducers({
  login: login,
  status: status,

})

export default reducer ;
