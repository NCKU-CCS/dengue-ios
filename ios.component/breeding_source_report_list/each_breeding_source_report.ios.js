import React, {
    View,
    Text,
    Component,
    TouchableHighlight,
    Image,
    StyleSheet,
} from 'react-native';
import StatusBar from '../status_bar.ios.js';
import CONSTANTS from '../constants.ios.js';

export default class BreedingSourceReportList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this._send = this._send.bind(this);
    }
    render() {
        return(
            <View style={styles.container}>
                <StatusBar title="檢查孳生源點" _back={this.props._back}></StatusBar>

                <Image ref={'img'} style={styles.image} source={{uri: this.props.uri}}>

                </Image>
                <View style={styles.info}>
                    <View style={styles.textView}>
                        <Text
                            style={styles.text}
                            >
                            資料
                        </Text>
                    </View>
                    <View style={styles.textView}>
                        <Text
                            style={styles.text}
                            >
                            資料
                        </Text>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this._send}>
                            <Text style={styles.buttonText}>是孳生源</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this._send}>
                            <Text style={styles.buttonText}>不是孳生源</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
    _send(){

    }
}
BreedingSourceReportList.defaultProps = {
    uri:"http://www.opcpest.com/res/images/pest-detail-images/og_mosquito-icon_1.png",
}
var styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
    },
    image: {
        marginTop: 50,
        height: CONSTANTS.screenHeight * 0.5,
        width: CONSTANTS.screenWidth * 0.9,
    },
    info: {
        width: CONSTANTS.screenWidth * 0.9,
        flexDirection:'column',
    },
    textView: {
        flex:1,
        height: 40,
        marginTop: 40,
        justifyContent:'center',
        alignItems:'center',
    },
    buttons: {
        position:"absolute",
        bottom:0,
        width:CONSTANTS.screenWidth,
        flexDirection:'row',
    },
    button: {
        flex:1,
        backgroundColor:"#e54",
        height:40,
        alignItems:'center',
        justifyContent:'center',
    },
})
