/*

reducers

*/

import { combineReducers } from 'redux';
import { login } from './login.js';
import { status } from './status.js';
import { hospital } from './hospital.js';
import { breedingSource } from './breedingSource.js';
import { mosquitoBite } from './mosquitoBite.js';
import { breedingSourceList } from './breedingSourceList.js';
import { popImage } from './popImage.js';
import { address } from './address.js';
const reducer = combineReducers({
  login,
  status,
  hospital,
  breedingSource,
  mosquitoBite,
  breedingSourceList,
  popImage,
  address,
})

export default reducer ;
