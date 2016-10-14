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
export function fetchLogin() {
  return {
    type: 'FETCHING_LOGIN'
  }
}
export function fetchLoginFailed() {
  return {
    type: 'FETCHING_FAILED',
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
      if(responseData.info.token === undefined) throw Error('reset');
      return dispatch(login(responseData.info, responseData.quick));
    })
  //  if there is no login data in storage
    .catch(() => {
      storage.clearMap();
      storage.remove({
        key: 'loginState'
      });
      storage.remove({
        key: 'hospitalInfo'
      });
      dispatch(firstOpen());
    });
}

export function requestLogin(phone, password, token) {
  return dispatch => {
    const data = { phone,password };
    dispatch(fetchLogin());
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
  };
}
export function requestQuickLogin() {
  return dispatch => {
    dispatch(fetchLogin());
    return fetch(`${APIDomain}/users/fast/`)
    .then(response => {
        if (!response.ok) throw new Error('requestQuickLogin Error');
        return response.json();
      })
      .then(responseData => {
        dispatch(login(responseData, true));
        saveLoginState({info: responseData, quick: true});
      })
  }
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
  return dispatch => {
    dispatch(fetchLogin());
    return fetch(`${APIDomain}/users/`, {
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
  }

}
