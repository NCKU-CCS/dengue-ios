import {ListView} from 'react-native';

const initState = {
  dataSource: null,
  displaySource: new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }),
  sourceNumber: 0,
  loaded: false,
  type: '全部',
  refreshing: false,
};
export function hospital(state = initState, action) {
  switch(action.type) {
    case 'HOSPITALINFO':
      const {responseData} = action;
      const displaySource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }).cloneWithRows(responseData);
      const sourceNumber = responseData.length;
      return {
        dataSource: responseData,
        displaySource,
        sourceNumber,
        loaded: true,
        type: '全部',
        refreshing: false,
      };
    case 'CHANGETYPE':
      const {newType} = action;
      let displaySourceData= [];
      if(newType === '全部') {
        displaySourceData = [...state.dataSource];
      } else if (newType === '其他') {
        displaySourceData = state.dataSource.filter((d) => {
          if(d.name.indexOf('醫院') === -1 && d.name.indexOf('診所') === -1)
            return d;
        });
      } else{
        displaySourceData = state.dataSource.filter((d) => {
          if(d.name.indexOf(newType) !== -1)
            return d;
        });
      }
      return {
        dataSource: [...state.dataSource],
        displaySource: state.displaySource.cloneWithRows(displaySourceData),
        type: newType,
        sourceNumber: displaySourceData.length,
        loaded: true,
        refreshing: false,
      };
    case 'REFRESHSTART':

      return {
        dataSource: [...state.dataSource],
        displaySource: state.displaySource,
        type: state.type,
        sourceNumber: state.sourceNumber,
        loaded: true,
        refreshing: true,
      };
    case 'REFRESHSTART':
      return {
        dataSource: [...state.dataSource],
        displaySource: state.displaySource,
        type: state.type,
        sourceNumber: state.sourceNumber,
        loaded: true,
        refreshing: false,
      };

    default :
      return state;
  }
}
