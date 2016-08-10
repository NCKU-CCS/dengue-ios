import { APIDomain, storage } from './global.js';
const saveBreedingSourceList = (id, responseData) =>
  storage.save({
    key: 'breedingSourceList',
    id,
    rawData: responseData,
    expires: 1000 * 3600 * 24,
  });

export function breedingSourceList(responseData) {
  return {
    type: 'BREEDINGSOURCELIST',
    responseData,

  };
}
export function sourceNumber(number) {
  return {
    type: 'SOURCENUMBER',
    number,

  };
}
export function selectStatus(status) {
  return {
    type: 'SELECTSTATUS',
    status,
  };
}
export function breedingrefreshStart() {
  return {
    type: 'BREEDINGREFRESHSTART',
  };
}
export function breedingrefreshDone() {
  return {
    type: 'BREEDINGREFRESHDONE',
  };
}
export function timeStamp(timestamp) {
  return {
    type: 'TIMESTAMP',
    timestamp,

  };
}
export function loadBreedingSourceList(status) {
  return dispatch =>{
    dispatch(selectStatus(status));
    return storage.load({
      key: 'breedingSourceList',
      id: status,
      autoSync: true,
      syncInBackground: true,

    })
      .then(responseData => {
        const dataLength = responseData.length;
        if(dataLength !== 0) dispatch(timeStamp(responseData[dataLength - 1].timestamp));
        dispatch(breedingSourceList(responseData))
      })
      .catch(err =>{
        console.warn(err);
      });
  }
}
export function requestBreedingSourceListNumber(id) {
  return dispatch =>
    fetch(`${APIDomain}/breeding_source/total/?database=tainan&status=${id}`)
      .then(response => {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(responseData => {
        dispatch(sourceNumber(responseData.total));
      })
      .catch(error => console.warn(error));
}

export function requestBreedingSourceList(id, timestamp) {
  timestamp = timestamp === '' ? '' : `&before_timestamp=${timestamp}`;
  return dispatch =>
    fetch(`${APIDomain}/breeding_source/get/?database=tainan&status=${id}${timestamp}`)
      .then(response => {
        if(!response.ok) throw new Error("requestBreedingSourceList");
        return response.json();
      })
      .then(responseData => {
        const dataLength = responseData.length;
        if(dataLength !== 0) dispatch(timeStamp(responseData[dataLength - 1].timestamp));
        dispatch(breedingSourceList(responseData));
        storage.save({
          key: 'breedingSourceList',
          id:id,
          rawData: responseData,
          expires: 1000 * 3600 * 24
        });
        // 成功则调用resolve
      })
      .catch(err => {
        console.error(err);
      });

}
export function requestUpdateStatus(status, formData) {
  return dispatch =>
     fetch(`${APIDomain}/breeding_source/update/`, {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        .then((response) => {
            if(!response.ok) throw Error(response);
            return dispatch(requestBreedingSourceListNumber(status));
        })
        .then(() =>  dispatch(requestBreedingSourceList(status, '')))
        .then(() => {
            alert('更新完成！');
        })
        .catch( err => {
            alert('更新失敗！');
            console.warn(err);
        });

}
