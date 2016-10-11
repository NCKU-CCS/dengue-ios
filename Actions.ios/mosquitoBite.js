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
export function requestMosquitoBite(data, token) {
  return dispatch =>{
    dispatch(startUploadBite());
    return fetch(`${APIDomain}/bite/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(data)
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
