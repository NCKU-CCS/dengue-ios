import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import CONSTANTS from '../Global.js';
export default class ShowImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'住家容器',
            description:'',
            lat:'',
            lon:'',
            address: '',
        };
        //this.showActionSheet = this.showActionSheet.bind(this);
    };
    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                let {latitude, longitude} = position.coords;

                this.setState({
                    lat:latitude,
                    lon:longitude,
                });
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&language=zh-TW&key=AIzaSyBKewv2_WjbQe8kW46Ld525jQ299gwKnIA`)
                .then(response => {
                    if(!response.ok){
                        throw Error('turn address failed');
                    }
                    return response.json();
                })
                .then(responseData => {
                    this.setState({address: responseData.results[0].formatted_address});
                })
                .catch(err => {
                    console.warn(err);
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
            <ScrollView  style={styles.container} ref="scrollView">
                <Image ref={'img'} style={styles.image} source={{uri: this.props.uri}}/>
                <View style={styles.inputs}>
                    <View style={styles.question}>
                        <View style={styles.title}>
                            <Text style={styles.subTitle}>
                                孳生源類型
                            </Text>
                        </View>
                        <View style={styles.types}>
                            <TouchableHighlight  style={styles.type} underlayColor={CONSTANTS.backgroundColor} onPress={()=>{this.setState({type:'住家容器'});}}>
                                <Image style={styles.typeImage} source = {imgObj0}/>

                            </TouchableHighlight>
                            <TouchableHighlight  style={styles.type} underlayColor={CONSTANTS.backgroundColor} onPress={()=>{this.setState({type:'戶外容器'});}}>

                                <Image style={styles.typeImage} source = {imgObj1}/>
                            </TouchableHighlight>
                            <TouchableHighlight  style={styles.type} underlayColor={CONSTANTS.backgroundColor} onPress={()=>{this.setState({type:'戶外髒亂處'});}}>
                                <Image style={styles.typeImage} source = {imgObj2}/>

                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style = {styles.question}>
                        <View style={styles.title}>
                            <Text style={styles.subTitle}>
                                地點簡介
                            </Text>
                        </View>
                        <View style={styles.answer}>
                            <TextInput
                                ref = 'textinput'
                                onFocus = {() => {
                                    this.refs.textinput.measure((x,y,width,height,px,py) => {

                                        if(py > CONSTANTS.screenHeight / 2){
                                            this.refs.scrollView.scrollTo({y:py-CONSTANTS.screenHeight / 3});
                                        }
                                    });
                                }}
                                multiline = {true}
                                style = {styles.textInput}
                                onChangeText = {(text) => this.setState({description:text})}
                                >
                            </TextInput>
                        </View>
                    </View>
                    <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this.send.bind(this)}>
                        <Text style={styles.buttonText}>舉報</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        )
    };
    send() {
        let {type, description, lat, lon, address} = this.state,
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
        formData.append('address', address);
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
            alert('舉報成功！');
        })
        .catch(err => {
            console.warn(err);
            alert('舉報失敗了！')
        })
        this.props.toTop();

    }

}
var styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTANTS.backgroundColor,
    },
    image: {
        height: 250,
        width: CONSTANTS.screenWidth,
        resizeMode: 'contain',
    },
    inputs: {
        flex:1,
        flexDirection: 'column',
        marginTop:20,
        marginHorizontal:30,
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
    subTitle: {
        fontSize: 16,
    },
    answer: {
        flex:1,
    },
    textInput: {
        backgroundColor:"#eee",
        borderColor:'#aaa',
        borderWidth:1,
        borderRadius:5,
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
        //width:70,
        //height:40,
        paddingVertical: 7,
        paddingHorizontal: 18,
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
