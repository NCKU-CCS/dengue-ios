import React, {
    View,
    Text,
    Component,
    StyleSheet,
    ListView,
    ActivityIndicatorIOS,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import CONSTANTS from '../Global.js';
import EachSource from './EachSource.js';
import Buttons from './Buttons.js';
import { loadHospitalInfo, changeType, requestHospitalInfo, refreshStart, refreshDone } from '../../Actions.ios/index.js';
class HospitalInfo extends Component {
    constructor(props) {
        super(props);
        this.changeType = this.changeType.bind(this);
        this.renderEachSource = this.renderEachSource.bind(this);
        this.enterCheckPage = this.enterCheckPage.bind(this);
      this.onRefresh = this.onRefresh.bind(this);
      this.renderPlaceText = this.renderPlaceText.bind(this);
    }
    componentDidMount(){
        this.loadData();
    }
    loadData() {
      this.props.dispatch(loadHospitalInfo());
    }
    fetchData() {
      const { dispatch, token } = this.props;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                dispatch(requestHospitalInfo(lat, lng, token));
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

    }
    changeType(newType) {
      this.props.dispatch(changeType(newType));
    }
    onRefresh(){
      const { dispatch } = this.props;
      dispatch(refreshStart());
      navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            dispatch(requestHospitalInfo(lat, lng))
              .then(() => dispatch(refreshDone()));
          },
          error => {
            //console.warn(error);
            alert('找不到定位資訊');
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
          }
        );

    }
    render() {
        if (!this.props.hospital.loaded) {
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
      const { sourceNumber, displaySource, type, refreshing } = this.props.hospital;
        return(
            <View style={styles.container}>
                <Text style={styles.topText}>
                    {`您附近有`}
                    <Text style={styles.sourceNumber}>
                        {sourceNumber}
                    </Text>

                    {this.renderPlaceText()}

                </Text>
                <Buttons
                    changeType = {this.changeType}
                    type = {type}

                    />
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    dataSource={displaySource}
                    renderRow={this.renderEachSource}
                    style={styles.listView}
                    />
            </View>
        );

    }
    renderPlaceText() {
      const { type } = this.props.hospital;
      switch(type) {
        case '全部':
          return '個快篩地點';
        case '醫院':
          return '間快篩醫院';
        case '診所':
          return '間快篩院所';
        case '其他':
          return '個其他快篩地點';
      }
    }
    renderEachSource(source) {
        return(
            <EachSource
                source = {source}
                enterCheckPage = {this.enterCheckPage}
                />
        );
    }
    enterCheckPage(source){
        this.props.enter("eachHospitalInfo",'就醫資訊',source);
    }
}
function select(state) {
  return {
    hospital: state.hospital,
    token: state.login.info.token,
  }
}
export default connect(select)(HospitalInfo);
var styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTANTS.backgroundColor,
        flex:1,
        paddingTop: 80,
        justifyContent:'center',
    },
    topText: {
        alignSelf:'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    sourceNumber: {
        color: CONSTANTS.mainColor,
    },

});
