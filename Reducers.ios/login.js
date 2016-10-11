/*

login reducers

*/


const initLogin = {
  quick: true,
  info: {
    token: '',
    user_uuid: '',
  },
  swiper: 0,
};

export function login(state = initLogin, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        quick: action.quick,
        info: action.info,
        swiper: -1,
      }
    case 'QUICKLOGIN':
      return {
        quick: true,
        info: action.info,
        swiper: -1,
      }
    case 'FIRSTOPEN':
      return Object.assign({}, initLogin, {swiper: 1});
    default:
      return state;
  }
}
