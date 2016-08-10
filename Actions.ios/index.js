import { requestLogout, requestLogin, storageLoadLogin, requestQuickLogin } from './login.js';
import { changeStatus } from './status.js';
import { loadHospitalInfo, changeType, requestHospitalInfo, refreshStart, refreshDone } from './hospital.js';
import {
  selectType,
  modifyAddress,
  requestAddress,
  changeDescription,
  requestUpload,
} from './breedingSource.js';
import {
  geoLocation,
  requestMosquitoBite,
} from './mosquitoBite.js';
import {
  requestBreedingSourceListNumber,
  requestBreedingSourceList,
  loadBreedingSourceList,
  selectStatus,
  breedingrefreshStart,
  breedingrefreshDone,
  requestUpdateStatus,
} from './breedingSourceList.js';
export {
  requestLogin,
  requestLogout,
  storageLoadLogin,
  requestQuickLogin,

  changeStatus,

  loadHospitalInfo,
  changeType,
  requestHospitalInfo,
  refreshStart,
  refreshDone,

  selectType,
  modifyAddress,
  requestAddress,
  changeDescription,
  requestUpload,

  geoLocation,
  requestMosquitoBite,

  requestBreedingSourceListNumber,
  requestBreedingSourceList,
  loadBreedingSourceList,
  selectStatus,
  breedingrefreshStart,
  breedingrefreshDone,
  requestUpdateStatus,
};
