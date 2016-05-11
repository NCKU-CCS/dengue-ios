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

export default class ShowImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'住家容器',
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
        const types = ['住家容器','戶外容器','戶外髒亂處'];
        let {type} = this.state,
        imgObj = ['../../img/home', '../../img/outContainer', '../../img/outMess'];
        for(let a in types){
            switch (a) {
                case '0':
                let imgObj0 = types[0] === type ? require('../../img/homeSelected.png'):require('../../img/home.png');
                break;
                case '1':
                let imgObj1 = types[1] === type ? require('../../img/outContainerSelected.png'):require('../../img/outContainer.png');
                break;
                case '2':
                let imgObj2 = types[2] === type ? require('../../img/outMessSelected.png'):require('../../img/outMess.png');
                break;
                default:
            }
        }
        return (
            <ScrollView  ref="mount">
                <Image ref={'img'} style={styles.image} source={{uri: this.props.uri}}/>
                <View style={styles.inputs}>
                    <View style={styles.question}>
                        <View style={styles.title}>
                            <Text>
                                孳生源類型
                            </Text>
                        </View>
                        <View style={styles.types}>
                            <TouchableHighlight  style={styles.type} underlayColor="#fff" onPress={()=>{this.setState({type:'住家容器'});}}>
                                <Image style={styles.typeImage} source = {imgObj0}/>

                            </TouchableHighlight>
                            <TouchableHighlight  style={styles.type} underlayColor="#fff" onPress={()=>{this.setState({type:'戶外容器'});}}>

                                <Image style={styles.typeImage} source = {imgObj1}/>
                            </TouchableHighlight>
                            <TouchableHighlight  style={styles.type} underlayColor="#fff" onPress={()=>{this.setState({type:'戶外髒亂處'});}}>
                                <Image style={styles.typeImage} source = {imgObj2}/>

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


    typeImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginHorizontal:20,
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
