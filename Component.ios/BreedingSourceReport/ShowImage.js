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
import BlurView from 'react-native-blur';
export default class ShowImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'住家',
            description:'',
            lat:'',
            lon:'',
            address: '',
            modifiedAddress: '',
        };
        //this.showActionSheet = this.showActionSheet.bind(this);
    }
    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;

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
                });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
    render() {
        const types = ['住家', '戶外'];
        //let {type} = this.state, imgObj0, imgObj1, imgObj2;
        //for(let a in types){
        //  switch (a) {
        //      case '0':
        //      imgObj0 = types[0] === type ? require('../../img/homeSelected.png'):require('../../img/home.png');
        //      break;
        //      case '1':
        //      imgObj1 = types[1] === type ? require('../../img/outContainerSelected.png'):require('../../img/outContainer.png');
        //      break;
        //      case '2':
        //      imgObj2 = types[2] === type ? require('../../img/outMessSelected.png'):require('../../img/outMess.png');
        //      break;
        //      default:
        //  }
        //}
        return (
            <ScrollView  style={styles.container} ref="scrollView">
                <Image ref={'img'} style={styles.image} source={{uri: this.props.uri}}>

                </Image>
                <View style={styles.inputs}>
                    <View style={styles.question}>
                        <View style={styles.title}>
                            <Text style={styles.subTitle}>
                                孳生源類型
                            </Text>
                        </View>
                        <View style={styles.types}>
                        {
                          types.map( type =>
                          <TouchableHighlight key={type}  style={[styles.type, this.state.type == type ? styles.click : null]} underlayColor={CONSTANTS.backgroundColor} onPress={()=>{this.setState({type: type});}}>
                             <Text style={this.state.type == type ? styles.clickText : null}>
                                {type}
                              </Text>
                          </TouchableHighlight>
                          )
                        }
                        {
                          //<TouchableHighlight  style={styles.type} underlayColor={CONSTANTS.backgroundColor} onPress={()=>{this.setState({type:'住家容器'});}}>
                          //    <Image style={styles.typeImage} source = {imgObj0}/>

                          //</TouchableHighlight>
                          //<TouchableHighlight  style={styles.type} underlayColor={CONSTANTS.backgroundColor} onPress={()=>{this.setState({type:'戶外容器'});}}>

                          //    <Image style={styles.typeImage} source = {imgObj1}/>
                          //</TouchableHighlight>
                          //<TouchableHighlight  style={styles.type} underlayColor={CONSTANTS.backgroundColor} onPress={()=>{this.setState({type:'戶外髒亂處'});}}>
                          //    <Image style={styles.typeImage} source = {imgObj2}/>

                          //    </TouchableHighlight>
                        }
                        </View>
                    </View>
                    <View style={styles.question}>
                        <View style={styles.title}>
                            <Text style={styles.subTitle}>
                                住址
                            </Text>
                        </View>
                        <View style={styles.answer}>
                            <TextInput
                                ref = 'modifiedAddress'
                                onFocus = {() => {
                                    this.refs.modifiedAddress.measure((x,y,width,height,px,py) => {

                                        if(py > CONSTANTS.screenHeight / 2){
                                            this.refs.scrollView.scrollTo({y:py-CONSTANTS.screenHeight / 3});
                                        }
                                    });
                                }}
                                placeholder={this.state.address}
                                multiline = {false}
                                style = {styles.textInput}
                                onChangeText = {(text) => this.setState({modifiedAddress:text})}
                                >
                            </TextInput>
                        </View>
                    </View>
                    <View style = {styles.question}>
                        <View style={styles.title}>
                            <Text style={styles.subTitle}>
                                簡介
                            </Text>
                            <Text style={styles.hint}>
                                ex地點：樓層/地下室/女廁旁
                            </Text>
                            <Text style={styles.hint}>
                                ex物件：藍色水桶/盆栽
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
                                multiline = {false}
                                style = {styles.textInput}
                                onChangeText = {(text) => this.setState({description:text})}
                                >
                            </TextInput>
                        </View>
                    </View>
                    <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this.send.bind(this)}>
                        <Text style={styles.buttonText}>這裡是孳生源！</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>

        );
    }
    send() {
        let {type, description, lat, lon, address, modifiedAddress} = this.state,
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
        formData.append('modified_address', modifiedAddress);
        formData.append('source_type', type);
        formData.append('description', description);
        formData.append('status', '未處理');
        fetch("http://api.denguefever.tw/breeding_source/insert/", {
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
            alert('上傳成功！');
        })
        .catch(err => {
            console.warn(err);
            alert('上傳失敗了！');
        });
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
    hint: {
        color: "#777",
        fontSize:14,
        marginTop:5,

    },
    answer: {
        flex:1,
    },
    textInput: {
        backgroundColor:"#eee",
        borderColor:'#aaa',
        borderWidth:1,
        borderRadius:5,
        paddingLeft:10,
        height: 40,
        marginRight:10,
    },
    types: {
        flex:1,
        height:50,
        flexDirection: 'row',
        alignItems:'center',
        alignSelf:'center',
    },


    type: {
        width: 100,
        marginHorizontal:20,
        padding:10,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        alignItems:'center',
        alignSelf:'center',
    },
    click: {
      backgroundColor: CONSTANTS.mainColor,
    },
    clickText: {
      color: 'white',
    },
    button: {
        backgroundColor: "#fff",
        //width:70,
        //height:40,
        paddingVertical: 7,
        paddingHorizontal: 18,
        marginVertical:20,
        borderRadius :3,
        borderColor: CONSTANTS.mainColor,
        borderWidth:1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color:'#000',
        fontSize: 20,
    },
});
