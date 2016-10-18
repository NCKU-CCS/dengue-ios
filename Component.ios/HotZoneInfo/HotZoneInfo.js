import React, {
  Component,
  StyleSheet,
  WebView,
  View,
  Text,
  ActivityIndicatorIOS,
} from 'react-native';
import CONSTANTS from '../Global.js';
import { connect } from 'react-redux';
import { requestGps } from '../../Actions.ios'
import Spinner from 'react-native-loading-spinner-overlay';
var DEFAULT_URL = 'https://www.taiwanstat.com/realtime/dengue-vis/';
class HotZoneInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,

    }
  }
  render() {
    const { lat, lng } = this.props;
    return(
      <View style={styles.webView}>
      <WebView
        ref="web"
        automaticallyAdjustContentInsets={false}
        source={{uri: `${DEFAULT_URL}?lat=${lat}&lng=${lng}`}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
        scalesPageToFit={true}
        startInLoadingState={false}
        onLoadStart={_ => this.setState({loading: true})}
        onLoadEnd={_ => this.setState({loading: false})}
        renderError={_ => <View style={styles.errorView}>
            <Text >
              無法連線，
            </Text>
            <Text>
              請確認網路連線狀況。
            </Text>
            <Text>
              若已開啟請等待更新頁面...
            </Text>
          </View>
        }
        renderLoading={_ => <View style={styles.errorView}>
            <ActivityIndicatorIOS
              animating={true}
              size="large"
              style={styles.indicator}
            />
          </View>
        }
      />
      <Spinner visible={this.state.loading} />
    </View>
    );
  }

}
function select(state) {
  return {
    statusId: state.status.id,
    lat: state.address.lat,
    lng: state.address.lng,
  }
}
export default connect(select)(HotZoneInfo);
var styles = StyleSheet.create({

  webView: {
    flex: 1,
    marginTop:65,
  },
  errorView: {
    flex: 1,
    alignItems:'center',
    height: CONSTANTS.screenHeight,
    justifyContent: 'center',
  },
  indicator: {
    alignSelf: 'center',
    justifyContent: 'center',
  }


});
