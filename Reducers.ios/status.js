const initState = {
  title:'即時疫情',
  id: 'hotZoneInfo',
};
export function status(state = initState, action) {
  switch(action.type) {
    case 'CHANGESTATUS':
      return {
        title: action.title,
        id: action.id
      };
    default :
      return state;
  }
}
