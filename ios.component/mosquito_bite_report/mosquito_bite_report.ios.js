import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Dimensions,
    AlertIOS,
} from 'react-native';
import StatusBar from '../status_bar.ios.js';
import CONSTANTS from '../constants.ios.js';
var IMGURI = 'http://www.opcpest.com/res/images/pest-detail-images/og_mosquito-icon_1.png';
export default class Second extends Component {

    constructor(props) {
        super(props);
        this.state={};
        this._send = this._send.bind(this);
    }
    omponentDidMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    lat:position.coords.latitude,
                    lon:position.coords.longitude,
                })
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    };
    render() {

        return (
            <View style={styles.container}>
                <StatusBar title="蚊子叮咬舉報" _back={this.props._back}></StatusBar>
                    <Image style={styles.image} source = {{uri:IMGURI}}>
                    </Image>
                <View style={styles.text}>
                    <Text>
                        如果接下來幾天，您出現發燒、想睡等症狀，請至鄰近快篩點診察。
                    </Text>
                </View>
                <TouchableHighlight  underlayColor="#eee" onPress={this._send.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>送出</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )


    }
    _send() {

        var state = this.state,
            props = this.props;

        if(state.lat === '' || state.lat === ''){
            AlertIOS.alert("未開啟定位服務");
        }
        else{
            fetch('http://localhost:1337/modquito_bite/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lat:state.lat,
                    lon: state.lon,
                })
            })
            .then((response) => response.text())
            .then((responseText) => {

                AlertIOS.alert(
                    '舉報成功'
                );
                props._back();
            })
            .catch((error) => {
                console.warn(error);
                AlertIOS.alert(
                    '舉報失敗'
                );
            });

        }

    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    image: {
        flex:0.7,
        width:CONSTANTS.screenWidth - 80,
        resizeMode:"contain",
    },

    text: {
        flex:0.3,
        justifyContent: 'center',
        paddingHorizontal:50,
    },
    button: {
        height: 30,
    }


});
