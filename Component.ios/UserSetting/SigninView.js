import React, {
  ScrollView,
  Component,
  Image,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  AlertIOS
} from 'react-native';
import CONSTANTS from '../Global.js';
import { connect } from 'react-redux';
import { requestLogin } from '../../Actions.ios/index.js';
import Button from '../Common/Button.js';

class SigninView extends Component {
  constructor(props) {
    super(props);
    this.state = {phone: "", password: ""};
    this.signin = this.signin.bind(this);
  }

  signin() {
    const {phone, password} = this.state;
    const {toTop, dispatch} = this.props;
    if(phone == '' || password == '') {
      return alert('有未填資訊唷！');
    }

    dispatch(requestLogin(phone, password)).then(() => toTop());
  }
  render() {
    return(
      <ScrollView style = {styles.container} ref = 'scrollView'>
        <Image
          source = {require('../../img/people.png')}
          style = {styles.image}
          >
          </Image>

          <View style = {styles.textInputView}>
            <Text style = {styles.label}>
              電話
            </Text>
            <TextInput
              style = {styles.textInput}
              onChangeText = {(text) => this.setState({phone: text})}
              value = {this.state.text}
              keyboardType = 'numeric'
              selectTextOnFocus = {true}
              selectionColor = {CONSTANTS.mainColor}
              autoCorrect = {false}
              ref = 'textinput1'
              onFocus = {() => {
                this.refs.textinput1.measure((x,y,width,height,px,py) => {

                  if(py > CONSTANTS.screenHeight / 2){
                    this.refs.scrollView.scrollTo({y:py-CONSTANTS.screenHeight / 3});
                  }
                });
              }}
              >
              </TextInput>
            </View>
            <View style = {styles.textInputView}>
              <Text style = {styles.label}>
                密碼
              </Text>
              <TextInput
                style = {styles.textInput}
                onChangeText = {(text) => this.setState({password: text})}
                value = {this.state.text}
                secureTextEntry = {true}
                selectionColor = {CONSTANTS.mainColor}
                autoCorrect = {false}
                ref = 'textinput2'
                onFocus = {() => {
                  this.refs.textinput2.measure((x,y,width,height,px,py) => {
                    if(py > CONSTANTS.screenHeight / 2){
                      this.refs.scrollView.scrollTo({y:py-CONSTANTS.screenHeight / 3});
                    }
                  });
                }}
                >
                </TextInput>
              </View>
              <Button onPress={this.signin}
                buttonText="登入"
              />
              </ScrollView>
    );
  }
}
export default connect()(SigninView);
const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.backgroundColor,
  },
  image: {
    marginTop: 30,
    height: 150,
    width: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  label: {
    color: CONSTANTS.mainLightColor,
    fontSize: 16,
  },
  textInputView: {
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    width:200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  textInput: {
    backgroundColor: CONSTANTS.backgroundColor,

    height: 30,
    width:200,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
  },
  hundredWidth: {
    flexDirection: 'row'
  },
  signin: {
    //height: 40,
    //width:60,
    marginTop: 30,
    paddingVertical: 8,
    paddingHorizontal: 25,
    backgroundColor: CONSTANTS.backgroundColor,
    borderRadius :3,
    borderColor: CONSTANTS.mainColor,
    borderWidth:1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

  },
  signinText: {

  },



});
