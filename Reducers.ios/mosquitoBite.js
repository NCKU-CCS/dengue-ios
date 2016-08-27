const initState = {
  lat: '',
  lng: '',
  uploadingBite: false,
};
export function mosquitoBite(state = initState, action) {
  switch(action.type) {
    case 'GEOLOCATION':
      return Object.assign({}, state, {
        lat: action.lat,
        lng: action.lng,
      });
    case 'UPLOADING':
      return Object.assign({}, state, {
        uploadingBite: true,
      });
    case 'UPLOADED':
      return Object.assign({}, state, {
        uploadingBite: false,
      });

    default :
      return state;
  }
}
