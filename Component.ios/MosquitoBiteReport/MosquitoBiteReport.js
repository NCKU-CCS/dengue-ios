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
    componentDidMount() {

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
