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
import DengueTextInput from '../Common/DengueTextInput';
import Button from '../Common/Button';
import {
  selectType,
  modifyAddress,
  requestAddress,
  changeDescription,
  requestUpload,
  popImage,

} from '../../Actions.ios/index.js';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
class ShowImage extends Component {
    constructor(props) {
        super(props);
        //this.showActionSheet = this.showActionSheet.bind(this);
      this.send = this.send.bind(this);
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
      const types = ['室內', '戶外'];
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
                  <View style={styles.input}>
                  <DengueTextInput
                    label="住址"
                    scrollView={this.refs.scrollView}
                    placeholder={address}
                    keyboardType="default"
                    defaultValue={address}
                    onChangeText = {text => dispatch(modifyAddress(text))}
                    onFocus = {textInput => {
                      textInput.measure((x,y,width,height,px,py) => {
                          if (py > CONSTANTS.screenHeight / 2)
                            this.refs.scrollView.scrollTo({y:py-200});
                      });
                    }}
                    onSubmitEditing={() => this.refs.descriptionTextInput.onFocus()}
                    returnKeyType="next"
                  />
                  </View>
                <View style={styles.input}>
                  <DengueTextInput
                    label="簡介"
                    hint={[
                      'ex地點：樓層/地下室/女廁旁',
                      'ex物件：藍色水桶/盆栽'
                    ]}
                    ref="descriptionTextInput"
                    scrollView={this.refs.scrollView}
                    placeholder="ex:樓層/地下室/女廁旁/藍色水桶/盆栽"
                    keyboardType="default"
                    onChangeText = {text => dispatch(changeDescription(text))}
                    onFocus = {textInput => {
                      textInput.measure((x,y,width,height,px,py) => {
                          if (py > CONSTANTS.screenHeight / 2)
                            this.refs.scrollView.scrollTo({y:py - 200});
                      });
                    }}
                    onSubmitEditing={this.send}
                    returnKeyType="send"
                  />
                </View>
                <Button onPress={this.send} buttonText="環境回報"/>
                </View>
              <Spinner visible={this.props.breedingSource.uploading}/>
            </ScrollView>

        );
    }
    send() {
      const { type, description, lat, lng, address, modifiedAddress } = this.props.breedingSource,
        { dispatch, uri, back, token } = this.props;
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
        formData.append('modified_address', modifiedAddress === '' ? address : modifiedAddress);
        formData.append('source_type', type);
        formData.append('description', description);
        formData.append('qualified_status', '待處理');
        if (lat === '' || lng === '') {
          alert('未開啟定位服務');
          return ;
        } else {
        dispatch(requestUpload(formData, token))
          .then(() => {
            dispatch(popImage());
          });
        }
    }

}
function select(state) {
  return {
    breedingSource: state.breedingSource,
    token: state.login.info.token
  };
}
export default connect(select)(ShowImage);

const styles = StyleSheet.create({
    container: {
      backgroundColor: CONSTANTS.backgroundColor,
      paddingTop: 70,
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
    input: {
      flexDirection: 'row',
      flex: 1,
      height: 50,
      marginVertical: 15,
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
