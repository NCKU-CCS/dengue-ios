import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicatorIOS,
  AlertIOS,
  ScrollView,
  View,
  Animated,
  Alert,
} from 'react-native';
import CONSTANTS from '../Global.js';
import { connect } from 'react-redux';
import { requestGps, requestMosquitoBite,
  startUploadBite, endUploadBite, popImage } from '../../Actions.ios/index.js';
import Button from '../Common/Button.js';
import Spinner from 'react-native-loading-spinner-overlay';
class MosquitoBiteReport extends Component {

  constructor(props) {
    super(props);
    this.send = this.send.bind(this);
  }

    render() {
    return (
      <ScrollView style = {styles.container}>
        <Text style={styles.text}>
          你被蚊子叮咬嗎?
        </Text>
        <Text style={styles.text}>
          請幫忙即刻回報喔!
        </Text>
        <Image style={styles.image} source = {require('../../img/mosquito.png')}>
        </Image>
        <Button onPress={this.send}
          buttonText="報告! 我被蚊子咬了"
        />
        <Text></Text>
        <Text style={styles.hint}>
          回報資料能協助研究團隊，
        </Text>
        <Text style={styles.hint}>
          更精準偵測蚊子的隱性躲藏點。
        </Text>
        <Spinner visible={this.props.mosquitoBite.uploadingBite} />
        </ScrollView>
    );


  }
  send() {

     const { toTop, dispatch, token, lat, lng } = this.props;
    if(lat === '' || lat === ''){
      AlertIOS.alert("未開啟定位服務");
    }
    else{
      const data = {
        lat, lng
      }
      dispatch(requestMosquitoBite(data, token))
        .then(() => {
          Alert.alert('回報成功！', '將提供於蚊媒熱度分析研究。', [{
            text: 'OK', onPress: () => {}
          }])
          // dispatch(popImage())
        })
      .catch((error) => {
          dispatch(endUploadBite());
          Alert.alert('不好意思！回報出了問題','請確認網路連線狀況，若有任何疑問也請回報給我們：）',[{
            text: 'OK', onPress: () => {}
          }])
      });
    }

  }
}
function select(state) {
  return {
    mosquitoBite: state.mosquitoBite,
    token: state.login.info.token,
    lat: state.address.lat,
    lng: state.address.lng
  };
}
export default connect(select)(MosquitoBiteReport);
var styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.backgroundColor,
    paddingTop: 80,
  },
  image: {
    height: 250,
    width:CONSTANTS.screenWidth * 0.5,
    resizeMode:"contain",
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },

  text: {
    fontSize: 22,
    alignSelf: 'center',
    marginTop: 15,
    marginHorizontal: 40,
  },
  hint: {
    fontSize: 16,
    alignSelf: 'center',
    //marginTop: 15,
    color: '#aaa',
    lineHeight: 20,
    //width: 200,
    //marginHorizontal: 40,
  },

  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor:CONSTANTS.mainColor,
    padding:10,
    width: 150,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,

  },
  buttonText: {
    color: '#fff',
  }


});
