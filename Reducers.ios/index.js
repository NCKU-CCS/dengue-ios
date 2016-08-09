/*

reducers

*/

import { combineReducers } from 'redux';
import { login } from './login.js';
import { status } from './status.js';
import { hospital } from './hospital.js';
import { breedingSource } from './breedingSource.js';
const reducer = combineReducers({
  login,
  status,
  hospital,
  breedingSource,

})

export default reducer ;
