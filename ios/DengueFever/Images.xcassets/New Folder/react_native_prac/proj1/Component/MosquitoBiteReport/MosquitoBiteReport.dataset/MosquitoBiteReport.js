import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Dimensions,
    AlertIOS,
    NativeModules,
    ScrollView,
} from 'react-native';
import StatusBar from '../StatusBar.js';
import CONSTANTS from '../Global.js';
export default class Second extends Component {

    constructor(props) {
        super(props);
        this.state={};
        this.send = this.send.bind(this);
    }
    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    lat:position.coords.latitude,
                    lon:position.coords.longitude,
                })
            },
            (error) => AlertIOS.alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    };
    render() {

        return (
            <ScrollView >
                    <Text style={styles.text}>
                        我被蚊子叮了！！
                    </Text>
                <Image style={styles.image} source = {require('../../img/mosquito.png')}>
                </Image>

                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#eee"
                    onPress={this.send.bind(this)}
                >
                    <Text style={styles.buttonText}>報告！這裡有蚊子</Text>
                </TouchableHighlight>
            </ScrollView>
        )


    }
    send() {

        let {lat,lon} = this.state,
            {back, toTop} = this.props;
        if(lat === '' || lat === ''){
            AlertIOS.alert("未開啟定位服務");
        }
        else{
            let obj = {
                uri:'/', // either an 'assets-library' url (for files from photo library) or an image dataURL
                uploadUrl:"http://140.116.247.113:11401/bite/insert/",
                //uploadUrl:"http://localhost:1337/breeding_source_report/",
                //fileName:fileName,
                fileKey:'photo', // (default="file") the name of the field in the POST form data under which to store the file
                mimeType:"text/plain",
                headers:{
                    Accept: "text/plain",
                    "Content-Type":"text/plain",
                },
                data: {
                    database:'tainan',
                    lat:lat,
                    lng:lon,
                }
            };
            NativeModules.FileTransfer.upload(obj, (err, res) => {
                if(res.status === 200){
                    AlertIOS.alert(
                        '舉報成功'
                    );
                    this.props.toTop();
                }
                else{
                    AlertIOS.alert(
                        '舉報失敗'
                    );
                }
            });
        }

    }
}

var styles = StyleSheet.create({

    image: {
        height: 250,
        width:CONSTANTS.screenWidth * 0.5,
        resizeMode:"contain",
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 50,
    },


    text: {
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 50,
    },
    button: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor:CONSTANTS.mainColor,
        padding:10,
        width: 150,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 3,

    },
    buttonText: {
        color: '#fff',
    }


});
