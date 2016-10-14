import { requestLogout, requestLogin, storageLoadLogin, requestQuickLogin, requestSignup, fetchLoginFailed } from './login.js';
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
  startUploadBite,
  endUploadBite,

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
import { popImage, dropImage } from './popImage.js';
export {
  requestLogin,
  requestLogout,
  storageLoadLogin,
  requestQuickLogin,
  requestSignup,
  fetchLoginFailed,


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
  startUploadBite,
  endUploadBite,

  requestBreedingSourceListNumber,
  requestBreedingSourceList,
  loadBreedingSourceList,
  selectStatus,
  breedingrefreshStart,
  breedingrefreshDone,
  requestUpdateStatus,

  popImage,
  dropImage,
};
