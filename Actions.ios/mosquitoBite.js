import { APIDomain } from './global.js';
export function geoLocation(lat, lng) {
  return {
    type: 'GEOLOCATION',
    lat,
    lng,
  };
}
export function startUploadBite() {
  return {
    type: 'UPLOADING',
  }
}
export function endUploadBite() {
  return {
    type: 'UPLOADED',
  }
}
export function requestMosquitoBite(formData) {
  return dispatch =>{
    dispatch(startUploadBite());
    return fetch(`${APIDomain}/bite/insert/`, {
      method: 'POST',
      headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
      .then(response => {
        dispatch(endUploadBite());
        if(!response.ok){
          throw Error(response.status);
        }
      })
      .catch(err => {
        //console.warn(err);
        alert('回報失敗了！');
      });
  }

}
