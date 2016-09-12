import React, {
  Component,
  StyleSheet,
  WebView
} from 'react-native';
import CONSTANTS from '../Global.js';
var DEFAULT_URL = 'https://www.taiwanstat.com/realtime/dengue-vis/';
export default class BreedingSourceReportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 22.99,
      lng: 120.22,
    }
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({
          lat,
          lng
        })
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  render() {
    const { lat, lng } = this.state;
    return(
      <WebView
        ref="web"
        automaticallyAdjustContentInsets={false}
        style={styles.webView}
        source={{uri: `${DEFAULT_URL}?lat=${lat}&lng=${lng}`}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
        scalesPageToFit={true}
          />
    );
  }

}
var styles = StyleSheet.create({

  webView: {
    flex: 1,
  }


});
