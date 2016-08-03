import { storage } from './global.js';

export function (info) {
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
    fetch(`${APIDomain}/users/signup/fast/`)
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
export function requestLogout() {
  return dispatch =>
    fetch(`${APIDomain}/users/signout/`)
      .then(response => {
        if (!response.ok) throw new Error('requestLogout Error');
        dispatch(logout());
      })
      .catch(err => console.error(err));
}

