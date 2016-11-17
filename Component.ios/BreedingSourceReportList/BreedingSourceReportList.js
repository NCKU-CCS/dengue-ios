import React, {
  View,
  Component,
  StyleSheet,
} from 'react-native';
import CONSTANTS from '../Global.js';
import BreedingListView from './BreedingListView.js';
import {
  requestBreedingSourceListNumber,
  requestBreedingSourceList,
  loadBreedingSourceList,
  breedingrefreshStart,
  breedingrefreshDone,
  selectStatus,
} from '../../Actions.ios/index.js';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
class BreedingSourceReportList extends Component {
  constructor(props) {
    super(props);
    this.changeSource = this.changeSource.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }
  componentDidMount() {
    // mount後 取得孳生源個數 ->（依照所選status） 讀取手機資料 -> 更新資料
    let {status} = this.props.breedingSourceList;
    const {dispatch, token} = this.props;
    dispatch(requestBreedingSourceListNumber(status, token))
    .then(() => dispatch(loadBreedingSourceList(status, token)))
    .then(() => dispatch(requestBreedingSourceList(status, '', token)));
    // this.updateData(this.state.status);
  }
  onRefresh() {
    // 處理下拉更新
    const {dispatch, token} = this.props;
    const {status} = this.props.breedingSourceList;
    dispatch(breedingrefreshStart());

    dispatch(requestBreedingSourceListNumber(status, token))
      .then(() => dispatch(requestBreedingSourceList(status, '', token)))
      .then(() => dispatch(breedingrefreshDone()));
  }
  changeSource(status) {
    // 切換status
    const {dispatch, token} = this.props;
    if(status !== this.props.breedingSourceList.status) {
      dispatch(selectStatus(status));
      dispatch(requestBreedingSourceListNumber(status, token))
        .then(() => dispatch(loadBreedingSourceList(status, token)));
    }
  }
  onEndReached() {
    // 滑到底的更新處理，因每次只拿5比資料
    let {status, timestamp} = this.props.breedingSourceList;
    const {dispatch, token} = this.props;
    dispatch(requestBreedingSourceListNumber(status, token))
    .then(() => dispatch(requestBreedingSourceList(status, timestamp, token)));
  }
  render() {
    const {
      dataSource,
      status,
      sourceNumber,
      refreshing,
    } = this.props.breedingSourceList;
    return(
      <View style={styles.container}>
      <BreedingListView
        dataSource = {dataSource}
        sourceNumber = {sourceNumber}
        status = {status}
        changeSource = {this.changeSource}
        refreshing = {refreshing}
        onRefresh = {this.onRefresh}
        onEndReached = {this.onEndReached}
      />
      <Spinner visible={!this.props.breedingSourceList.loaded} />
    </View>
    );
  }

}

function select(state) {
  return {
    breedingSourceList: state.breedingSourceList,
    token: state.login.info.token
  };
}
export default connect(select)(BreedingSourceReportList);
const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.backgroundColor,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 80,
  }
});
