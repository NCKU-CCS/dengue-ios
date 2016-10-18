const initState = {
  uploadingBite: false,
};
export function mosquitoBite(state = initState, action) {
  switch(action.type) {
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
