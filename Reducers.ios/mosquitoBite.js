const initState = {
  lat: '',
  lng: '',
};
export function mosquitoBite(state = initState, action) {
  switch(action.type) {
    case 'GEOLOCATION':
      return {
        lat: action.lat,
        lng: action.lng
      };
    default :
      return state;
  }
}
