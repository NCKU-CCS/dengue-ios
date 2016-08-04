const initState = {
  lat: 22.99,
  lng: 120.22,

};
export function status(state = initState, action) {
  switch (action.type) {
    case 'GEOLOCATION':
      return {
        lat: action.lat,
        lng: action.lng,

      };
    default :
      return state;
  }
}
