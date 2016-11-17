const initState = {
  lat: '',
  lng: '',
  address: '',
  isQuerying: false,
  success: false,
  error: false,
  errorMsg: '',
};

export function address(state = initState, action) {
  switch (action.type) {
    case 'REQUEST_GPS_START':
      return Object.assign({}, state, {
        isQuerying: true,
        success: false,
        error: false,
      });
    case 'REQUEST_GPS_SUCCESS':
      return Object.assign({}, state, {
        lat: action.lat,
        lng: action.lng,
        isQuerying: false,
        success: true,
        error: false,
      });
    case 'REQUEST_GPS_FAILED':
      return Object.assign({}, state, {
        isQuerying: false,
        success: false,
        error: true,
        errorMsg: '無法取得定位資訊',
      });
    case 'ADDRESS':
      return Object.assign({},
        state,
        {address: action.address}
      );
    default:
      return state;
  }
}
