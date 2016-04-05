import React, {
    View,
    Text,
    Component,
    StyleSheet,
    WebView
} from 'react-native';
import CONSTANTS from '../constants.ios.js';
import StatusBar from '../status_bar.ios.js';
var DEFAULT_URL = 'http://real.taiwanstat.com/kaohsiung-2015-dengue/';
export default class BreedingSourceReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
        this._onShouldStartLoadWithRequest = this._onShouldStartLoadWithRequest.bind(this);
    }
    _onNavigationStateChange(){}
    _onShouldStartLoadWithRequest(event){
        return true;
    }
    render() {
        return(
            <View style={styles.container}>
                <StatusBar title="熱區資訊" _back={this.props._back}></StatusBar>
                <WebView
                    ref="web"
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: DEFAULT_URL}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this._onNavigationStateChange}
                    onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    />
            </View>
        )


    }

}
var styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTANTS.backgroundColor,
        flexDirection: 'column',
        flex:1,
    },
    webView: {
        flex: 1,

    }


})
