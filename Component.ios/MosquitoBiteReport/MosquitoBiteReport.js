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
import StatusBar from '../StatusBar.js';
import CONSTANTS from '../Global.js';
var IMGURI = 'http://www.opcpest.com/res/images/pest-detail-images/og_mosquito-icon_1.png';
export default class Second extends Component {

    constructor(props) {
        super(props);
        this.state={};
        this.send = this.send.bind(this);
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
                <View style={styles.textView}>
                    <Text style={styles.text}>
                        我被蚊子叮了！！
                    </Text>
                </View>
                <Image style={styles.image} source = {{uri:IMGURI}}>
                </Image>

                <TouchableHighlight  underlayColor="#eee" onPress={this.send.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>報告！這裡有蚊子</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )


    }
    send() {

        var state = this.state,
        props = this.props;

        if(state.lat === '' || state.lat === ''){
            AlertIOS.alert("未開啟定位服務");
        }
        else{
            fetch('http://140.116.247.113:11401/bite/insert', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'database': 'tainan',
                    lat:state.lat,
                    lng: state.lon,
                })
            })
            .then((response) => {
                if(!response.ok) {
                    throw Error(response.status);
                }
                return response.text()
            })
            .then((responseText) => {

                AlertIOS.alert(
                    '舉報成功'
                );
                props.back();
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
        alignItems:'center',
        marginBottom:150,
        flexDirection:'column'
    },
    image: {
        flex:2,
        width:CONSTANTS.screenWidth * 0.5,
        resizeMode:"contain",
        justifyContent: 'center',
        marginBottom: 50,
    },

    textView: {
        flex:1,
        justifyContent: 'center',
        marginTop:50,
    },
    text: {
        fontSize: 18,

    },
    button: {
        flex:2,
        justifyContent: 'center',
        backgroundColor:CONSTANTS.mainColor,
        padding:10,
    },
    buttonText: {
        color: '#fff',
    }


});
