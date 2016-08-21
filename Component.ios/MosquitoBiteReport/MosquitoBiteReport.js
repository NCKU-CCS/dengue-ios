import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  AlertIOS,
  ScrollView,
  Animated,
} from 'react-native';
import CONSTANTS from '../Global.js';
import { connect } from 'react-redux';
import { geoLocation, requestMosquitoBite } from '../../Actions.ios/index.js';
class MosquitoBiteReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(CONSTANTS.screenHeight),
      imageIndex: 0,
    };
    this.closeImage = this.closeImage.bind(this);
    this.send = this.send.bind(this);
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
    const arr = [
      require('../../img/popImage1.png'),
      require('../../img/popImage2.png'),
      require('../../img/popImage3.png'),
    ],
    { imageIndex, top } = this.state;
    return (
      <ScrollView style = {styles.container}>
        <Text style={styles.text}>
          我被蚊子叮了！！
        </Text>
        <Image style={styles.image} source = {require('../../img/mosquito.png')}>
        </Image>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#eee"
          onPress={this.send}
          >
            <Text style={styles.buttonText}>報告！這裡有蚊子</Text>
          </TouchableHighlight>
          <Animated.View
            style = {{
              width: CONSTANTS.screenWidth,
              height: CONSTANTS.screenHeight,
              backgroundColor:CONSTANTS.backgroundColor,
              position: 'absolute',
              top: top,
            }}
            >
            </Animated.View>
          <TouchableWithoutFeedback
            onPress={this.closeImage}
            style = {{
              position: 'absolute',
              top: 0,
            }}
          >
          <Animated.Image
            source = {arr[imageIndex]}
            style = {{
              width: CONSTANTS.screenWidth - 100,
              height: CONSTANTS.screenHeight,
              marginLeft: 50,
              resizeMode: 'contain',
              position: 'absolute',
              top: top,
            }}
            >
            </Animated.Image>
          </TouchableWithoutFeedback>
          </ScrollView>
    );


  }
  send() {

    const { lat, lng } = this.props.mosquitoBite,
      {toTop, dispatch } = this.props;
    if(lat === '' || lat === ''){
      AlertIOS.alert("未開啟定位服務");
    }
    else{
      this.setState({imageIndex: Math.floor(Math.random()*3)});
      let formData = new FormData();
      formData.append('database', 'tainan');
      formData.append('lat', lat);
      formData.append('lng', lng);
      dispatch(requestMosquitoBite(formData))
        .then(() => {
          this.state.top.setValue(500);
          Animated.timing(
            this.state.top,
            {
              toValue: 0,
              duration: 300,
            }
          ).start();
          //toTop();
        });

    }

  }
  closeImage() {
    Animated.timing(
      this.state.top,
      {
        toValue: CONSTANTS.screenHeight,
        duration: 300,
      }
    ).start();
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
