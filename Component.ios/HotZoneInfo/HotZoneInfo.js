import React, {
    Component,
    StyleSheet,
    WebView
} from 'react-native';
import CONSTANTS from '../Global.js';
const webUrl = 'https://www.taiwanstat.com/realtime/dengue-vis/';
export default class BreedingSourceReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           url: `${webUrl}?lat=22.99&lng=120.218`,
        };
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this.onShouldStartLoadWithRequest = this.onShouldStartLoadWithRequest.bind(this);
    }
    onNavigationStateChange(){}
    onShouldStartLoadWithRequest(event){
        return true;
    }
    componentDidMount() {
     navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                this.setState({
                  uri: `${webUrl}?lng=${lon}&lat=${lat}`
                });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

    }
    render() {
        return(
                <WebView
                    ref="web"
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
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
