import { requestLogout, requestLogin, storageLoadLogin, requestQuickLogin, requestSignup, fetchLoginFailed } from './login.js';
import { changeStatus } from './status.js';
import { loadHospitalInfo, changeType, requestHospitalInfo, refreshStart, refreshDone } from './hospital.js';
import {
  selectType,
  modifyAddress,
  changeDescription,
  requestUpload,
} from './breedingSource.js';
import {
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
import { requestGps, requestAddress } from './address.js';
import { flipToggle } from './hotZoneInfo.js';
export {
  flipToggle,

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
  changeDescription,
  requestUpload,

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

  requestGps,
  requestAddress,
};
