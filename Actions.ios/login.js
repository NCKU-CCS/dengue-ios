import { APIDomain, storage } from './global.js';

const saveLoginState = responseData =>
  storage.save({
    key: 'loginState',  //注意:请不要在key中使用_下划线符号!
    rawData: responseData,
    expires: 1000 * 60
  });

export function quickLogin(info) {
  return {
    type: 'QUICKLOGIN',
    info,
  };
}
export function login(info) {
  return {
    type: 'LOGIN',
    info,
  };
}
export function logout() {
  return {
    type: 'LOGOUT',
  };
}
export function firstOpen() {
  return {
    type: 'FIRSTOPEN',
  }
}
export function storageLoadLogin() {
  return dispatch =>
    storage.load({
      key: 'loginState',
      autoSync: false,
      syncInBackground: true
    })
      .then(responseData => dispatch(login(responseData)))
      .catch(() => dispatch(firstOpen()));
}

export function requestLogin(phone, password) {
  return dispatch => {
    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('password', password);
    return fetch(`${APIDomain}/users/signin/`, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) throw new Error('requestLogin Error');
        return response.json();
      })
      .then(responseData => {
        dispatch(login(responseData));
        saveLoginState(responseData);
        console.log(responseData);
      })
      .catch(err => console.error(err));
  };
}
export function requestQuickLogin() {
  return dispatch =>
    fetch(`${APIDomain}/users/signin/fast/`)
      .then(response => {
        if (!response.ok) throw new Error('requestQuickLogin Error');
        return response.json();
      })
      .then(responseData => {
        console.log(responseData);
        dispatch(quickLogin(responseData));
        saveLoginState(responseData);
      })
      .catch(err => console.error(err));
}


