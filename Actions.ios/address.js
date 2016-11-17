export function requestGpsStart() {
  return {
    type: 'REQUEST_GPS_START',
  };
}
export function requestGpsFailed() {
  return {
    type: 'REQUEST_GPS_FAILED',
  };
}
export function requestGpsSuccess(lat, lng) {
  return {
    type: 'REQUEST_GPS_SUCCESS',
    lat,
    lng,
  };
}
export function address(addr) {
  return {
    type: 'ADDRESS',
    address: addr,
  };
}
export function requestGps() {
  return dispatch => {
    dispatch(requestGpsStart());
    navigator.geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        dispatch(requestGpsSuccess(latitude, longitude));
      },
      () => {
        alert('找不到定位資訊');
        dispatch(requestGpsFailed());
      },
      {enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  };
}
export function requestAddress(lat, lng) {
  return dispatch => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address&language=zh-TW&key=AIzaSyBKewv2_WjbQe8kW46Ld525jQ299gwKnIA`)
      .then(response => {
        if (!response.ok)
          throw Error('turn address failed');
        else
          return response.json();
      })
      .then(responseData => {
        dispatch(address(responseData.results[0].formatted_address));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
