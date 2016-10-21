const initState = {
  flip: false,
};

export function hotZoneInfo(state = initState, action) {
  switch (action.type) {
    case 'FLIP_TOGGLE':
      return {
        flip: !state.flip,
      };
    default:
      return state;
  }
}
