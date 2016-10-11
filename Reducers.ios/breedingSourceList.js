import { ListView } from 'react-native';

const initState = {
  data: [],
  dataSource: new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }),
  timestamp: '',
  sourceNumber: 0,
  loaded: false,
  status: '待審核',
  refreshing: false,
};
export function breedingSourceList(state = initState, action) {
  const { responseData, status } = action;
  let data,
    dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
  switch(action.type) {
    case 'BREEDINGSOURCELIST':
      data = [...responseData];
      dataSource = dataSource.cloneWithRows(data);
      return {
        ...state,
        data,
        dataSource,
        loaded: true,
        refreshing: false,
      };
    case 'ADDBREEDINGSOURCELIST':
      data = [...state.data,...responseData];
      dataSource = dataSource.cloneWithRows(data);
      return {
        ...state,
        data,
        dataSource,
        loaded: true,
        refreshing: false,
      }
    case 'SOURCENUMBER':
      return {
        ...state,
        sourceNumber: action.number,
        loaded: true,
        refreshing: false,
      };
    case 'SELECTSTATUS':
      return {
        ...state,
        status,
        loaded: false,
        refreshing: false,
      };
    case 'BREEDINGREFRESHSTART':
      return {
        ...state,
        loaded: true,
        refreshing: true,
      }
    case 'BREEDINGREFRESHDONE':
      return {
        ...state,
        loaded: true,
        refreshing: false,
      }
    case 'TIMESTAMP':
      return {
        ...state,
        loaded: true,
        refreshing: false,
        timestamp: action.timestamp,
      }
    default :
      return state;
  }
}
