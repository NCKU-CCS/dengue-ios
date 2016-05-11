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
    ScrollView,
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
            unmount: false,
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
        if(!this.state.unmount){
            return (
                <ScrollView  ref="mount">
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
                                        style = {styles.typeText}
                                        >
                                        住家容器
                                    </Text>
                                </TouchableHighlight>
                                <TouchableHighlight  style={typeStyle[1]} underlayColor="#eee" onPress={()=>{this.setState({type:'戶外a'})}}>
                                    <Text
                                        style = {styles.typeText}
                                        >
                                        戶外容器
                                    </Text>
                                </TouchableHighlight>
                                <TouchableHighlight  style={typeStyle[2]} underlayColor="#eee" onPress={()=>{this.setState({type:'戶外b'})}}>
                                    <Text
                                        style = {styles.typeText}
                                        >
                                        戶外髒亂處
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
                                    multiline = {true}
                                    style = {styles.textInput}
                                    onChangeText = {(text) => this.setState({description:text})}
                                    placeholder = "  description(大樹旁)"
                                    >
                                </TextInput>
                            </View>
                        </View>
                        <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this.send.bind(this)}>
                            <Text style={styles.buttonText}>送出</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            )
        }
        return null;
    };
    send() {

        let {type, description, lat, lon} = this.state,
        fileName = this.props.uri.split('/').slice(-1)[0];
        let photo = {
            uri: this.props.uri,
            type: 'image/jpeg',
            name: fileName,
        }, formData = new FormData();
        formData.append('photo', photo);
        formData.append('database', 'tainan');
        formData.append('lat', lat);
        formData.append('lng', lon);
        formData.append('source_type', type);
        formData.append('description', description);
        formData.append('status', '未處理');
        fetch("http://140.116.247.113:11401/breeding_source/insert/", {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        .then(response => {
            if(!response.ok){
                throw Error(response.status);
            }
            this.props.toTop();
        })
        .catch(err => {
            console.warn(err);
        })
        /*let obj = {
        uri:this.props.uri, // either an 'assets-library' url (for files from photo library) or an image dataURL
        uploadUrl:"http://140.116.247.113:11401/breeding_source/insert/",
        //uploadUrl:"http://localhost:1337/breeding_source_report/",
        fileName:fileName,
        fileKey:'photo', // (default="file") the name of the field in the POST form data under which to store the file
        mimeType:"multipart/form-data",
        headers:{
        Accept: "multipart/form-data",
        "Content-Type":"multipart/form-data",
        },
        data: {
        database:'tainan',
        lat:lat,
        lng:lon,
        source_type: type,
        description: description,
        status: "未處理"
        // whatever properties you wish to send in the request
        // along with the uploaded file
        }
        };
        if(lat === '' || lat === ''){
        AlertIOS.alert("未開啟定位服務");
        }
        else if (description === '') {
        AlertIOS.alert('請填寫資料');
        }
        else{
        let subscription = NativeAppEventEmitter.addListener(
        'transferring',
        (response) => {
        console.log("Transferring: percentage: ", response.progress * 100);
        }
        );
        NativeModules.FileTransfer.upload(obj, (err, res) => {
        console.log(res.status);
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
        console.warn(err);
        }
        subscription.remove();
        // handle response
        // it is an object with 'status' and 'data' properties
        // if the file path protocol is not supported the status will be 0
        // and the request won't be made at all
        });
        }*/

    }

}
var styles = StyleSheet.create({
    image: {
        height: 250,
        width: CONSTANTS.screenWidth,
        resizeMode: 'contain',
    },
    inputs: {
        flex:1,
        flexDirection: 'column',
        marginTop:20,
        marginHorizontal:50,
    },
    question: {
        flex:1,
        flexDirection: 'column',
        marginTop: 20,

    },
    title: {
        flex:1,
        justifyContent:'center',
        marginBottom: 20,
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
        marginRight:10,
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
    typeText: {
        fontSize:10,
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
        marginTop:20,
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
