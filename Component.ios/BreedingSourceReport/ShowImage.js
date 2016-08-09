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
import {
  selectType,
  modifyAddress,
  requestAddress,
  changeDescription,
  requestUpload
} from '../../Actions.ios/index.js';
import { connect } from 'react-redux';

class ShowImage extends Component {
    constructor(props) {
        super(props);
        //this.showActionSheet = this.showActionSheet.bind(this);
    }
    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;

                this.props.dispatch(requestAddress(latitude, longitude));
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
    render() {
      const { dispatch, uri }  = this.props,
            { address, modifiedAddress, type } = this.props.breedingSource;
        const types = ['住家容器','戶外容器','戶外髒亂處'];
        let imgObj0, imgObj1, imgObj2;
        for(let a in types){
            switch (a) {
                case '0':
                imgObj0 = types[0] === type ? require('../../img/homeSelected.png'):require('../../img/home.png');
                break;
                case '1':
                imgObj1 = types[1] === type ? require('../../img/outContainerSelected.png'):require('../../img/outContainer.png');
                break;
                case '2':
                imgObj2 = types[2] === type ? require('../../img/outMessSelected.png'):require('../../img/outMess.png');
                break;
                default:
            }
        }
        return (
            <ScrollView  style={styles.container} ref="scrollView">
                <Image ref={'img'} style={styles.image} source={{uri}}>

                </Image>
                <View style={styles.inputs}>
                    <View style={styles.question}>
                        <View style={styles.title}>
                            <Text style={styles.subTitle}>
                                孳生源類型
                            </Text>
                        </View>
                        <View style={styles.types}>
                          <TouchableHighlight  style={styles.type} underlayColor={CONSTANTS.backgroundColor} onPress={() => dispatch(selectType('住家容器'))}>
                                <Image style={styles.typeImage} source = {imgObj0}/>

                            </TouchableHighlight>
                            <TouchableHighlight  style={styles.type} underlayColor={CONSTANTS.backgroundColor} onPress={() => dispatch(selectType('戶外容器'))}>

                                <Image style={styles.typeImage} source = {imgObj1}/>
                            </TouchableHighlight>
                            <TouchableHighlight  style={styles.type} underlayColor={CONSTANTS.backgroundColor} onPress={() => dispatch(selectType('戶外髒亂處'))}>
                                <Image style={styles.typeImage} source = {imgObj2}/>

                            </TouchableHighlight>
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
                                placeholder={address}
                                multiline = {false}
                                style = {styles.textInput}
                                onChangeText = {text => dispatch(modifyAddress(text))}
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
                                onChangeText = {text => dispatch(changeDescription(text))}
                                >
                            </TextInput>
                        </View>
                    </View>
                    <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this.send.bind(this)}>
                        <Text style={styles.buttonText}>舉報</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>

        );
    }
    send() {
      const { type, description, lat, lng, address, modifiedAddress } = this.props.breedingSource,
        { dispatch, uri, toTop } = this.props;
        fileName = uri.split('/').slice(-1)[0];
        const photo = {
            uri: uri,
            type: 'image/jpeg',
            name: fileName,
        }, formData = new FormData();
        formData.append('photo', photo);
        formData.append('database', 'tainan');
        formData.append('lat', lat);
        formData.append('lng', lng);
        formData.append('address', address);
        formData.append('modified_address', modifiedAddress);
        formData.append('source_type', type);
        formData.append('description', description);
        formData.append('status', '未處理');
        dispatch(requestUpload(formData))
          .then(() => toTop());

    }

}
function select(state) {
  return {
    breedingSource: state.breedingSource,

  };
}
export default connect(select)(ShowImage);

const styles = StyleSheet.create({
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
