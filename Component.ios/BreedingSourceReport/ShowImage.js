import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Dimensions,
    TouchableHighlight,
    NativeModules,
    AlertIOS,
    ActionSheetIOS,
} from 'react-native';
import CONSTANTS from '../Global.js';
import StatusBar from '../StatusBar.js';


var BUTTONS = ['積水', '空屋'];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
export default class ShowImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'點擊選擇',
            description:'',
            lat:'',
            lon:'',
        };
        this.showActionSheet = this.showActionSheet.bind(this);
    };
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
                <Image ref={'img'}style={styles.image} source={{uri: this.props.uri}}>

                </Image>
                <View style={styles.inputs}>
                    <View>
                        <TouchableHighlight  underlayColor="#eee" onPress={this.showActionSheet}>
                            <View style={styles.textInput}>
                                <Text

                                    >
                                    {this.state.type}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({description:text})}
                        placeholder="  description(大樹旁)"
                        >
                    </TextInput>
                    <TouchableHighlight  underlayColor="#eee" onPress={this._send.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>送出</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };
    _send() {

        var state = this.state,
        fileName = this.props.uri.split('/').slice(-1)[0];
        var obj = {
            uri:this.props.uri, // either an 'assets-library' url (for files from photo library) or an image dataURL
            uploadUrl:"http://localhost:1337/breeding_source_report/",
            fileName:fileName,
            //fileKey, // (default="file") the name of the field in the POST form data under which to store the file
            mimeType:"text/plain",
            headers:{
                Accept: "text/plain",
                "Content-Type":"text/plain",
            },
            data: {
                lat:state.lat,
                lon: state.lon,
                type: state.type,
                description: state.description,
                // whatever properties you wish to send in the request
                // along with the uploaded file
            }
        };
        if(state.lat === '' || state.lat === ''){
            AlertIOS.alert("未開啟定位服務");
        }
        else if (state.type === '點擊選擇' || state.description === '') {
            AlertIOS.alert('請填寫資料');
        }
        else{
            NativeModules.FileTransfer.upload(obj, (err, res) => {
                if(obj.status=200){
                    AlertIOS.alert(
                        '舉報成功'
                    );
                    this.props._toTop();
                }
                else{
                    AlertIOS.alert(
                        '舉報失敗'
                    );
                }
                // handle response
                // it is an object with 'status' and 'data' properties
                // if the file path protocol is not supported the status will be 0
                // and the request won't be made at all
            });
        }

    }
    showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            tintColor: 'green',
        },
        (buttonIndex) => {
            this.setState({ type: BUTTONS[buttonIndex] });
        });
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor:'#eee'
    },

    inputs: {
        width:CONSTANTS.screenWidth * 0.9,
        marginTop:40,
    },
    textInput: {
        height: 40,
        backgroundColor: "#ffffff",
        marginBottom:20,
        justifyContent:'center',
    },
    image: {
        marginTop: 50,
        height: CONSTANTS.screenHeight * 0.5,
        width: CONSTANTS.screenWidth * 0.9,
    },
    selector: {
        flex:1,
        marginBottom:20,
        backgroundColor:CONSTANTS.mainColor
    },
    button: {
        flex:1,
        backgroundColor:CONSTANTS.mainColor,
        height: 40,
        padding: 5,
        borderRadius :1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color:'#fff',

    },
});
