import {APIDomain} from './global.js';
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
  };
}
export function endUploadImage() {
  return {
    type: 'UPLOADED_IMAGE',
  };
}
export function requestUpload(formData, token) {
  return dispatch => {
    dispatch(startUploadImage());
    return fetch(`${APIDomain}/breeding_source/?qualified_status=待處理`, {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Token ${token}`
            },
            body: formData
        })
        .then(response => {
            dispatch(endUploadImage());
            if(!response.ok)
                throw Error(response.status);
        });
      };
}
