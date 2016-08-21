import { APIDomain } from './global.js';
export function geoLocation(lat, lng) {
  return {
    type: 'GEOLOCATION',
    lat,
    lng,
  };
}
export function requestMosquitoBite(formData) {
  return dispatch =>
    fetch(`${APIDomain}/bite/insert/`, {
      method: 'POST',
      headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
      .then(response => {
        if(!response.ok){
          throw Error(response.status);
        }
      })
      .catch(err => {
        console.warn(err);
        alert('舉報失敗了！');
      });

}
