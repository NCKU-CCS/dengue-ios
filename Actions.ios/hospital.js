import { APIDomain, storage } from './global.js';
const saveHospitalInfo = responseData =>
  storage.save({
    key: 'hospitalInfo',
    rawData: responseData,
    expires: 1000 * 3600
  });

export function hospitalInfo(responseData) {
  return {
    type: 'HOSPITALINFO',
    responseData,

  };
}
export function changeType(newType) {
  return {
    type: 'CHANGETYPE',
    newType,

  };
}
export function refreshStart() {
  return {
    type: 'REFRESHSTART',
  };
}
export function refreshDone() {
  return {
    type: 'REFRESHDONE',
  };
}
export function loadHospitalInfo() {
  return dispatch =>
    storage.load({
      key: 'hospitalInfo',
      autoSync: true,
      syncInBackground: true,

    })
      .then(responseData => {
        dispatch(hospitalInfo(responseData))
      })
      .catch(err =>{
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            dispatch(requestHospitalInfo(lat, lng));
          },
          error => {
            //console.warn(error)
            alert('找不到定位資訊');
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
          }
        );
        console.error(err);
      });
}
export function requestHospitalInfo(lat, lng) {
  return dispatch =>
    fetch(`${APIDomain}/hospital/nearby/?database=tainan&lng=${lng}&lat=${lat}`)
      .then(response => {
        if(!response.ok){
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(responseData => {
        dispatch(hospitalInfo(responseData));
        saveHospitalInfo(responseData);
      })
      .catch(error => {
        //console.error(error);
        alert('找不到定位資訊');
      });

}
