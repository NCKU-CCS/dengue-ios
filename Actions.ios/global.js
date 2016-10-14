import DeviceInfo from 'react-native-device-info';
import Storage from 'react-native-storage';
export let APIDomain = DeviceInfo.getModel() === 'Simulator'
  ? 'https://api.denguefever.tw'
  : 'https://api.denguefever.tw';
// NOTICE ncku server shut down so use production server a while
// APIDomain = 'http://api.denguefever.tw';
export const storage = new Storage({
  size: 1000,
  defaultExpires: null,
  enableCache: true,
  sync: {},
});
storage.sync = {
  //同步方法的名字必须和所存数据的key完全相同
  //方法接受的参数为一整个object，所有参数从object中解构取出
  //这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
  breedingSourceList(params){
    let { id, resolve, reject } = params;
    fetch(`${APIDomain}/breeding_source/?qualified_status=${id}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then(response => {
        if (!response.ok) throw Error('breedingSourcesync');
        return response.json()
      })
      .then(responseData => {
        if (responseData) {
          resolve && resolve(responseData);
          storage.save({
            key: 'breedingSourceList',
            id:id,
            rawData: responseData,
            expires: 1000
          });
          // 成功则调用resolve
        }
        else {
          // 失败则调用reject
          reject && reject('data parse error');
        }
      })
      .catch(err => {
        console.warn(err);
        reject && reject(err);
      })
  },
  hospitalInfo(params) {
    let { resolve, reject } = params;
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`${APIDomain}/hospital/nearby/?lng=${lon}&lat=${lat}`)
          .then(response => response.json())
          .then(responseData => {
            if(responseData){
              resolve && resolve(responseData);
              storage.save({
                key: 'hospitalInfo',
                rawData: responseData,
                expires:  1000,
              });
            }
            else{
              reject && reject(err);
            }
          })
          .catch(err => {
            console.warn(new Error('hospitalInfo error'));
            reject && reject(err);
          })
          .done();
      },
      error => {
        alert('找不到定位資訊');
        console.warn(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  },
  loginState(params) {
    let { id, resolve, reject } = params;
    fetch(`${APIDomain}/users/info/`)
      .then(response => response.json())
      .then(responseData => {
        if(responseData){
          resolve && resolve(responseData);
          storage.save({
            key: 'loginState',
            rawData: responseData,
            expires:  1000 * 60
          });
          // 成功则调用resolve
        }
        else{
          // 失败则调用reject
          reject && reject('data parse error');
        }
      })
      .catch(err => {
        console.warn(err);
        reject && reject(err);
      });
  }
};

