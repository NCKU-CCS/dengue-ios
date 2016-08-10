import { ListView } from 'react-native';

const initState = {
  dataSource: new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }),
  timestamp: '',
  sourceNumber: 0,
  loaded: false,
  status: '未處理',
  refreshing: false,
};
export function breedingSourceList(state = initState, action) {
  switch(action.type) {
    case 'BREEDINGSOURCELIST':
      const { responseData } = action,
        dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }).cloneWithRows(responseData);
      return {
        dataSource,
        sourceNumber: state.sourceNumber,
        loaded: true,
        status: state.status,
        refreshing: false,
        timestamp: state.timestamp,
      };
    case 'SOURCENUMBER':
      return {
        dataSource: state.dataSource,
        status: state.status,
        sourceNumber: action.number,
        loaded: true,
        refreshing: false,
        timestamp: state.timestamp,
      };
    case 'SELECTSTATUS':
      const { status } = action;
      return {
        dataSource: state.dataSource,
        status,
        sourceNumber: state.sourceNumber,
        loaded: false,
        refreshing: false,
        timestamp: state.timestamp,
      };
    case 'BREEDINGREFRESHSTART':
      return {
        dataSource: state.dataSource,
        status: state.status,
        sourceNumber: state.sourceNumber,
        loaded: true,
        refreshing: true,
        timestamp: state.timestamp,
      }
    case 'BREEDINGREFRESHDONE':
      return {
        dataSource: state.dataSource,
        status: state.status,
        sourceNumber: state.sourceNumber,
        loaded: true,
        refreshing: false,
        timestamp: state.timestamp,
      }
    case 'TIMESTAMP':
      return {
        dataSource: state.dataSource,
        status: state.status,
        sourceNumber: state.sourceNumber,
        loaded: true,
        refreshing: false,
        timestamp: action.timestamp,
      }
    default :
      return state;
  }
}
