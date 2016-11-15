import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Alert,
  ActivityIndicatorIOS,
  PixelRatio,
} from 'react-native';
import CONSTANTS from '../Global.js';
import DengueTextInput from '../Common/DengueTextInput';
import Button from '../Common/Button';
import {
  selectType,
  modifyAddress,
  requestAddress,
  changeDescription,
  requestUpload,
  popImage,
  endUploadImage,
  requestGps,
} from '../../Actions.ios';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay';
class ShowImage extends Component {
  constructor(props) {
    super(props);
    // this.showActionSheet = this.showActionSheet.bind(this);

    this.send = this.send.bind(this);
    this.scrollToInput = this.scrollToInput.bind(this);
  }
  componentDidMount() {
    const { dispatch, lat, lng } = this.props;
    dispatch(requestAddress(lat, lng));
  }
  componentWillReceiveProps(nextProps) {
    const { lat, lng, dispatch } = this.props;
    if(nextProps.lat !== lat && nextProps.lng !== lng) {
      alert('here')
      dispatch(requestAddress(nextProps.lat, nextProps.lng));
    }
  }
  scrollToInput(event, refName) {
    let node = React.findNodeHandle(this.refs[refName]);
    let extraHeight = 70; // height of your text input
    this.refs.scrollView.scrollToFocusedInput(event, node, extraHeight);
  }
  render() {
    const types = ['室內', '戶外'];
    const { dispatch, uri, address }  = this.props,
      { modifiedAddress, type, uploading } = this.props.breedingSource;
    return (
      <KeyboardAwareScrollView  style={styles.container} ref="scrollView">
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
      ref="addressTextInput"
      scrollView={this.refs.scrollView}
      placeholder={address}
      keyboardType="default"
      defaultValue={address}
      onEndEditing = {text => dispatch(modifyAddress(text))}
      onFocus={(event) => {
        this.scrollToInput(event, 'addressTextInput');
      }}
      onSubmitEditing={() => this.refs.descriptionTextInput.onFocus()}
      returnKeyType="next"
      multiline={true}
      style={{height:70}}
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
        onEndEditing = {text => dispatch(changeDescription(text))}
        onFocus={(event) => {
          this.scrollToInput(event, 'descriptionTextInput');
        }}
      onSubmitEditing={this.send}
      returnKeyType="send"
      />
      </View>
      <Button onPress={this.send} buttonText="環境回報"/>
      </View>
      <Spinner visible={this.props.breedingSource.uploading}/>
      </KeyboardAwareScrollView>

    );
  }
  send() {
    const { type, description, modifiedAddress } = this.props.breedingSource,
      { dispatch, uri, back, token, lat, lng, address } = this.props;
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
    } else if (address === '') {
      alert('請確認網路連線狀況');
      return ;
    } else {
      dispatch(requestUpload(formData, token))
        .then(() => {
          dispatch(popImage());
        })
        .catch((error) => {
          dispatch(endUploadImage());
          Alert.alert('不好意思！回報出了問題','請確認網路連線狀況，若有任何疑問也請回報給我們：）',[{
            text: 'OK', onPress: () => {}
          }])
        });

    }
  }

}
function select(state) {
  return {
    breedingSource: state.breedingSource,
    token: state.login.info.token,
    lat: state.address.lat,
    lng: state.address.lng,
    address: state.address.address,
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
    marginVertical: 20,
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
