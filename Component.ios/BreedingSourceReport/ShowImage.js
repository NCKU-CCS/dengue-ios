import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    ScrollView,
    ActivityIndicatorIOS,
} from 'react-native';
import CONSTANTS from '../Global.js';
import BlurView from 'react-native-blur';
import {
  selectType,
  modifyAddress,
  requestAddress,
  changeDescription,
  requestUpload,
  popImage,

} from '../../Actions.ios/index.js';
import { connect } from 'react-redux';

class ShowImage extends Component {
    constructor(props) {
        super(props);
        //this.showActionSheet = this.showActionSheet.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }
    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;

                this.props.dispatch(requestAddress(latitude, longitude));
            },
            (error) => alert('找不到定位資訊'),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
    render() {
        const types = ['住家', '戶外'];
      const { dispatch, uri }  = this.props,
            { address, modifiedAddress, type, uploading } = this.props.breedingSource;
        return (
            <ScrollView  style={styles.container} ref="scrollView">
                <Image ref={'img'} style={styles.image} source={{uri}}></Image>
                <View style={styles.inputs}>
                    <View style={styles.question}>
                        <View style={styles.title}>
                            <Text style={styles.subTitle}>
                                孳生源類型
                            </Text>
                        </View>
                        <View style={styles.types}>
                        {
                          types.map( d =>
                            <TouchableHighlight key={d}
                              style={[styles.type, type == d ? styles.click : null]}
                              underlayColor={CONSTANTS.backgroundColor}
                              onPress={() => dispatch(selectType(d))}>
                             <Text style={type == d ? styles.clickText : null}>
                                {d}
                              </Text>
                          </TouchableHighlight>
                          )
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
                    {this.renderButton()}
                </View>
            </ScrollView>

        );
    }
    renderButton() {
      if(this.props.breedingSource.uploading) {
        return (
          <View style={styles.button}>
            <ActivityIndicatorIOS color={CONSTANTS.mainColor}></ActivityIndicatorIOS>
          </View>
        );
      }
      else {
        return (
          <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this.send.bind(this)}>
            <Text style={styles.buttonText}>這裡是孳生源！</Text>
          </TouchableHighlight>
        );
      }
    }
    send() {
      const { type, description, lat, lng, address, modifiedAddress } = this.props.breedingSource,
        { dispatch, uri, back } = this.props;
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
          .then(() => {
            dispatch(popImage());
          });
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
        backgroundColor: '#fff',
    },
    click: {
      backgroundColor: CONSTANTS.mainColor,
    },
    clickText: {
      color: 'white',
    },
    button: {
        backgroundColor: "#fff",
        width: 200,
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
