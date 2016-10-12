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
export function login(info, quick) {
  return {
    type: 'LOGIN',
    info,
    quick
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
    .then(responseData => {
      return dispatch(login(responseData.info, responseData.quick));
    })
  //  if there is no login data in storage
    .catch(() => dispatch(firstOpen()));
}

export function requestLogin(phone, password, token) {
  return dispatch => {
    const data = { phone,password };
    return fetch(`${APIDomain}/users/signin/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) throw new Error('requestLogin Error');
        return response.json();
      })
      .then(responseData => {
        dispatch(login(responseData, false));
        saveLoginState({info: responseData, quick: false});
      })
      .catch(err => console.error(err));
  };
}
export function requestQuickLogin() {
  return dispatch =>
    fetch(`${APIDomain}/users/fast/`)
    .then(response => {
        if (!response.ok) throw new Error('requestQuickLogin Error');
        return response.json();
      })
      .then(responseData => {
        dispatch(login(responseData, true));
        saveLoginState({info: responseData, quick: true});
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
export function requestSignup(formData, token) {
  return dispatch =>
    fetch(`${APIDomain}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(formData)
    })
    .then((response) => {
        if(!response.ok){
          throw Error(response.status);
        }
      return response.json();
      //return dispatch(getInfo());
      })
    .then(responseData => {
        dispatch(login(responseData, false));
        saveLoginState({info: responseData, quick: false});
      })
      .catch((error) => {
        console.warn(error);
        alert("不好意思！註冊出了問題：）");
      });

}
