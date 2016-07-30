/*

login reducers

*/


const initLogin = {
  logined: false,
  info: {
    identity: '一般使用者',
  },
  swiper: 0,
}

export function login(state = initLogin, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        logined: true,
        info: action.info,
        swiper: -1,
      }
    case 'LOGOUT':
      return Object.assign({}, initLogin, {swiper: -1});
    case 'QUICKLOGIN':
      return {
        logined: true,
        info: action.info,
        swiper: -1,
      }
    case 'FIRSTOPEN':
      return Object.assign({}, initLogin, {swiper: 1});
    default:
      return state;
  }
}
