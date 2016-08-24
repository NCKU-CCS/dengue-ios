
export function popImage(state = 0, action) {
  switch(action.type) {
    case 'POPIMAGE':
      return 1;
    case 'DROPIMAGE':
      return 0;
    default :
      return state;
  }
}
