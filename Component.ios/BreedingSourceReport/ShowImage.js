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
            type:'住家',
            description:'',
            lat:'',
            lon:'',
        };
        //this.showActionSheet = this.showActionSheet.bind(this);
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
        let types = ['住家','戶外a','戶外b'],
            typeStyle = [styles.type, styles.type, styles.type];
        for( let a in types){
            if(types[a] === this.state.type){
                typeStyle[a] = styles.typeSelected;
                break;
            }
        }
        return (
            <View style={styles.container}>
                <Image ref={'img'}style={styles.image} source={{uri: this.props.uri}}>

                </Image>
                <View style={styles.inputs}>
                    <View style={styles.question}>
                        <View style={styles.title}>
                            <Text>
                                孳生源類型
                            </Text>
                        </View>
                        <View style={styles.types}>
                            <TouchableHighlight  style={typeStyle[0]} underlayColor="#eee" onPress={()=>{this.setState({type:'住家'})}}>
                                <Text

                                    >
                                    住家
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight  style={typeStyle[1]} underlayColor="#eee" onPress={()=>{this.setState({type:'戶外a'})}}>
                                <Text

                                    >
                                    戶外a
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight  style={typeStyle[2]} underlayColor="#eee" onPress={()=>{this.setState({type:'戶外b'})}}>
                                <Text

                                    >
                                    戶外b
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style = {styles.question}>
                        <View style={styles.title}>
                            <Text>
                                地點簡介
                            </Text>
                        </View>
                        <View style={styles.answer}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({description:text})}
                                placeholder="  description(大樹旁)"
                                >
                            </TextInput>
                        </View>
                    </View>
                    <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this.send.bind(this)}>
                        <Text style={styles.buttonText}>送出</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };
    send() {

        let state = this.state,
        fileName = this.props.uri.split('/').slice(-1)[0];
        let obj = {
            uri:this.props.uri, // either an 'assets-library' url (for files from photo library) or an image dataURL
            uploadUrl:"http://140.116.247.113:11401/breeding_source/insert/",
            fileName:fileName,
            //fileKey, // (default="file") the name of the field in the POST form data under which to store the file
            mimeType:"text/plain",
            headers:{
                Accept: "text/plain",
                "Content-Type":"text/plain",
            },
            data: {
                database:'tainan',
                lat:state.lat,
                lng: state.lon,
                source_type: state.type,
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
                    this.props.toTop();
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
    /*showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            tintColor: 'green',
        },
        (buttonIndex) => {
            this.setState({ type: BUTTONS[buttonIndex] });
        });
    }*/
}
var styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        paddingBottom:100,
        backgroundColor: CONSTANTS.backgroundColor
    },
    image: {
        flex:1,
        width:CONSTANTS.screenWidth,
        resizeMode:'contain',
    },
    inputs: {
        flex:1,
        flexDirection: 'column',
        marginTop:20,
        marginHorizontal:50,
    },
    question: {
        flex:1,
        flexDirection: 'column'
    },
    title: {
        flex:1,
        justifyContent:'center',
    },
    answer: {
        flex:1,
    },
    textInput: {
        backgroundColor:"#eee",
        borderColor:'#aaa',
        borderWidth:1,
        borderRadius:1,
        height: 40,
    },
    types: {
        //flex:1,
        height:50,
        flexDirection: 'row',
        alignItems:'center',
        alignSelf:'center',
    },

    type: {
        height:50,
        width:50,
        alignItems:'center',
        justifyContent: 'center',
        marginHorizontal:10,
        backgroundColor:'#fff',
        borderRadius:25,
        borderColor:"#777",
        borderWidth:1,
    },
    typeSelected: {
        height:50,
        width:50,
        alignItems:'center',
        justifyContent: 'center',
        marginHorizontal:10,
        backgroundColor:CONSTANTS.mainColor,
        borderRadius:25,
        borderColor:CONSTANTS.mainColor,
        borderWidth:1,
    },
    button: {
        backgroundColor: "#fff",
        width:70,
        height:40,
        padding: 5,
        borderRadius :3,
        borderColor: CONSTANTS.mainColor,
        borderWidth:1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color:'#000',
    },
});
