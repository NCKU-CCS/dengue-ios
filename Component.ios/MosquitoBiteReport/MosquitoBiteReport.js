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
} from 'react-native';
import CONSTANTS from '../Global.js';
import { connect } from 'react-redux';
import { geoLocation, requestMosquitoBite,
  startUploadBite, endUploadBite, popImage } from '../../Actions.ios/index.js';
import Button from '../Common/Button.js';
class MosquitoBiteReport extends Component {

  constructor(props) {
    super(props);
    this.send = this.send.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }
  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        this.props.dispatch(geoLocation(
          position.coords.latitude,
          position.coords.longitude,
        ));
      },
      (error) => alert('找不到定位資訊'),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  render() {
    return (
      <ScrollView style = {styles.container}>
        <Text style={styles.text}>
          我被蚊子叮了！！
        </Text>
        <Image style={styles.image} source = {require('../../img/mosquito.png')}>
        </Image>
        <Button onPress={this.send}
          buttonText="報告！這裡有蚊子"
        />

        </ScrollView>
    );


  }
  renderButton() {
    if(this.props.mosquitoBite.uploadingBite) {
      return (
        <ActivityIndicatorIOS color={CONSTANTS.mainColor}>
        </ActivityIndicatorIOS>
      );
    }
     else {
      return (
        <Text style={styles.buttonText}>報告！這裡有蚊子</Text>
      );
    }
  }
  send() {

     const { lat, lng } = this.props.mosquitoBite,
      {toTop, dispatch } = this.props;
    if(lat === '' || lat === ''){
      AlertIOS.alert("未開啟定位服務");
    }
    else{
    let formData = new FormData();
    formData.append('database', 'tainan');
    formData.append('lat', lat);
    formData.append('lng', lng);

      dispatch(requestMosquitoBite(formData))
      .then(() => dispatch(popImage()));
    }

  }
}
function select(state) {
  return {
    mosquitoBite: state.mosquitoBite,
  };
}
export default connect(select)(MosquitoBiteReport);
var styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.backgroundColor,
  },
  image: {
    height: 250,
    width:CONSTANTS.screenWidth * 0.5,
    resizeMode:"contain",
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },


  text: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 50,
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
