import React, {
  View,
  Component,
  StyleSheet,
  ListView,
  ActivityIndicatorIOS
} from 'react-native';
import CONSTANTS from '../Global.js';
import BreedingListView from './BreedingListView.js';
import {
  requestBreedingSourceListNumber,
  requestBreedingSourceList,
  loadBreedingSourceList,
  breedingrefreshStart,
  breedingrefreshDone,
} from '../../Actions.ios/index.js';
import { connect } from 'react-redux';
class BreedingSourceReportList extends Component {
  constructor(props) {
    super(props);
    this.renderListView  = this.renderListView.bind(this);
    this.changeSource = this.changeSource.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }
  componentDidMount(){
    let { status } = this.props.breedingSourceList;
    const { dispatch } = this.props;
    status = status === '已處理' ? status + ',非孳生源': status;
    dispatch(requestBreedingSourceListNumber(status))
      .then(() => dispatch(loadBreedingSourceList(status)));

    //this.updateData(this.state.status);
  }
  onRefresh(){
    const { dispatch } = this.props,
      { status, timestamp } = this.props.breedingSourceList;
    dispatch(breedingrefreshStart());

    dispatch(requestBreedingSourceListNumber(status))
      .then(() =>  dispatch(requestBreedingSourceList(status, '')));
    dispatch(breedingrefreshDone());
  }
  changeSource(status){
    const { dispatch } = this.props;
    if(status !== this.props.breedingSourceList.status){

      dispatch(requestBreedingSourceListNumber(status))
        .then(() => dispatch(loadBreedingSourceList(status)));
    }
  }
  onEndReached() {
    let { id, timestamp } = this.props.breedingSourceList;
    id = id === '已處理' ? id + ',非孳生源': id;
    const { dispatch } = this.props;
    dispatch(requestBreedingSourceListNumber(id))
      .then(() => dispatch(requestBreedingSourceList(id, timestamp)));
  }
  render() {
    if (!this.props.breedingSourceList.loaded) {
      return this.renderLoadingView();
    }
    return this.renderListView();

  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          animating={true}
          style={{height: 80}}
          size="large"
        />
      </View>
    );
  }
  renderListView() {
    const {
      dataSource,
      status,
      sourceNumber,
      refreshing,
    } = this.props.breedingSourceList;
    return(
      <BreedingListView
        dataSource = {dataSource}
        sourceNumber = {sourceNumber}
        status = {status}
        changeSource = {this.changeSource}
        refreshing = {refreshing}
        onRefresh = {this.onRefresh}
        onEndReached = {this.onEndReached}
          />
    );
  }

}

function select(state) {
  return {
    breedingSourceList: state.breedingSourceList,
  };
}
export default connect(select)(BreedingSourceReportList);
const styles = StyleSheet.create({
  container:{
    backgroundColor: CONSTANTS.backgroundColor,
    flex:1,
    justifyContent:'center',
  }
});
