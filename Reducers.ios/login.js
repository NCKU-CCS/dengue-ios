/*

login reducers

*/


const initLogin = {
  quick: true,
  info: {
    token: '',
    user_uuid: '', // eslint-disable-line camelcase
  },
  swiper: 0,
  isFetching: false,
};

export function login(state = initLogin, action) {
  switch (action.type) {
    case 'FETCHING_LOGIN':
      return Object.assign({}, state, {isFetching: true});
    case 'FETCHING_FAILED':
      return Object.assign({}, state, {isFetching: false});
    case 'LOGIN':
      return {
        quick: action.quick,
        info: action.info,
        swiper: -1,
        isFetching: false,
      };
    case 'QUICKLOGIN':
      return {
        quick: true,
        info: action.info,
        swiper: -1,
        isFetching: false,
      };
    case 'FIRSTOPEN':
      return Object.assign({}, initLogin, {swiper: 1});
    default:
      return state;
  }
}
