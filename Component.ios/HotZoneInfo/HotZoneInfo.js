import React, {
    Component,
    StyleSheet,
    WebView
} from 'react-native';
import CONSTANTS from '../Global.js';
var DEFAULT_URL = 'https://abz53378.github.io/dengue-vis/' || 'http://real.taiwanstat.com/kaohsiung-2015-dengue/';
export default class BreedingSourceReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this.onShouldStartLoadWithRequest = this.onShouldStartLoadWithRequest.bind(this);
    }
    onNavigationStateChange(){}
    onShouldStartLoadWithRequest(event){
        return true;
    }
    render() {
        return(
                <WebView
                    ref="web"
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: DEFAULT_URL}}
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
