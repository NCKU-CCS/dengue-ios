const initState = {
  type:'住家容器',
  lat: '',
  lng: '',
  description:'',
  address: '',
  modifiedAddress: '',
};
export function breedingSource(state = initState, action) {
  switch(action.type) {
    case 'SELECTTYPE':
      return Object.assign({},
        state,
        { type: action.newType }
      );
    case 'CHANGEDESCRIPTION':
      return Object.assign({},
        state,
        { description: action.description }
      );
    case 'MODIFYADDRESS':
      return Object.assign({},
        state,
        { modifiedAddress: action.modifiedAddress}
      );
    case 'ADDRESS':
      return Object.assign({},
        state,
        { address: action.address }
      );
    case 'GEOLOCATION':
      return Object.assign({},
        state,
        {
          lat: action.lat,
          lng: action.lng,
        }
      );
    default :
      return state;
  }
}
