import { APIDomain } from './global.js';
export function address(address) {
  return {
    type: 'ADDRESS',
    address,

  };
}
export function geoLocation(lat, lng) {
  return {
    type: 'GEOLOCATION',
    lat,
    lng,
  };
}
export function selectType(newType) {
  return {
    type: 'SELECTTYPE',
    newType,

  };
}
export function changeDescription(description) {
  return {
    type: 'CHANGEDESCRIPTION',
    description,

  };
}
export function modifyAddress(modifiedAddress) {
  return {
    type: 'MODIFYADDRESS',
    modifiedAddress,

  };
}
export function startUploadImage() {
  return {
    type: 'UPLOADING_IMAGE',
  }
}
export function endUploadImage() {
  return {
    type: 'UPLOADED_IMAGE',
  }
}
export function requestAddress(lat, lng) {
  return dispatch =>
    dispatch(geoLocation(lat, lng));
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address&language=zh-TW&key=AIzaSyBKewv2_WjbQe8kW46Ld525jQ299gwKnIA`)
      .then(response => {
        if(!response.ok){
          throw Error('turn address failed');
        }
        return response.json();
      })
      .then(responseData => {
        dispatch(address(responseData.results[0].formatted_address));
      })
      .catch(err => {
        console.warn(err);
      });
}
export function requestUpload(formData) {
  return dispatch => {
    dispatch(startUploadImage());
    return fetch(`${APIDomain}/breeding_source/insert/`, {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        .then(response => {
            dispatch(endUploadImage());
            if(!response.ok){
                throw Error(response.status);
            }
        })
        .catch(err => {
            console.warn(err);
            alert('抱歉~上傳失敗了！');
        });
  }

}
