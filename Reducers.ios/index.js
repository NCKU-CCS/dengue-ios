/*

reducers

*/

import { combineReducers } from 'redux';
import { login } from './login.js';
import { status } from './status.js';
import { hospital } from './hospital.js';
const reducer = combineReducers({
  login,
  status,
  hospital,

})

export default reducer ;
