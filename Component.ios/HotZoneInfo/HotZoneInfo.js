import React from 'react';
import {
  StyleSheet,
  WebView,
  View,
  Text,
  Easing,
  ActivityIndicatorIOS,
  TouchableHighlight,
} from 'react-native';
import CONSTANTS from '../Global.js';
import { connect } from 'react-redux';
import { requestGps } from '../../Actions.ios'
import Spinner from 'react-native-loading-spinner-overlay';
import FlipView from 'react-native-flip-view';

const DEFAULT_URL1 = 'https://www.taiwanstat.com/realtime/dengue-vis/';
const DEFAULT_URL2 = 'https://winone520.github.io/dengue_app/';
class HotZoneInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.renderView = this.renderView.bind(this);
  }
  render() {
    return (
      <FlipView
        style={{flex: 1}}
        front={this.renderView(DEFAULT_URL1)}
        back={this.renderView(DEFAULT_URL2)}
        isFlipped={this.props.flip}
        onFlip={(val) => {console.log('Flipped: ' + val);}}
        flipAxis="y"
        flipEasing={Easing.out(Easing.ease)}
        flipDuration={700}
        perspective={1000}
      />
    )
  }
  renderView(URL) {
    const { lat, lng } = this.props;
    return(
      <View style={styles.webView}>
      <WebView
        ref="web"
        automaticallyAdjustContentInsets={false}
        source={{uri: `${URL}?lat=${lat}&lng=${lng}`}}
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
    flip: state.hotZoneInfo.flip
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
