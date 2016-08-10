import { APIDomain, storage } from './global.js';
const saveLoginState = responseData =>
  storage.save({
    key: 'loginState',  //注意:请不要在key中使用_下划线符号!
    rawData: responseData,
    expires: 1000 * 60
  });
const removeLoginState = () =>
  storage.remove({
    key: 'loginState'
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
      .then(responseData => dispatch(getInfo()))
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
        return fetch(`${APIDomain}/users/info/`);
      })
      .then(response => {
        if(!response.ok) throw new Error('getInfo Error');
        return response.json();
      })
      .then(responseData => {
        dispatch(login(responseData));
        saveLoginState(responseData);
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
        removeLoginState();
        return dispatch(logout());
      })
      .then(() => dispatch(requestQuickLogin()))
      .catch(err => console.error(err));
}
export function getInfo() {
  return dispatch =>
    fetch(`${APIDomain}/users/info/`)
      .then(response => {
         if(!response.ok){
          throw Error(response.status);
        }
        return response.json();
      })
    .then(responseData => {
        dispatch(login(responseData));
        saveLoginState(responseData);
      })

}
export function requestSignup(formData) {
  return dispatch =>
    fetch(`${APIDomain}/users/signup/`, {
      method: 'POST',
      headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
      .then((response) => {
        if(!response.ok){
          throw Error(response.status);
        }
        return dispatch(getInfo());
      })
      .then(() => {
        alert('註冊成功！') ;
      })
      .catch((error) => {
        console.warn(error);
        alert("不好意思！註冊出了問題：）");
      });

}
