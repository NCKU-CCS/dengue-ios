import React, {
  Component,
  Image,
  TextInput,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import CONSTANTS from '../Global.js';
import {connect} from 'react-redux';
import {requestLogin, fetchLoginFailed} from '../../Actions.ios/index.js';
import Button from '../Common/Button.js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class SigninView extends Component {
  constructor(props) {
    super(props);
    this.state = {phone: '', password: ''};
    this.signin = this.signin.bind(this);
  }
  scrollToInput(event, refName) {
    const node = React.findNodeHandle(this.refs[refName]);
    const extraHeight = 80; // height of your text input
    this.refs.scrollView.scrollToFocusedInput(event, node, extraHeight);
  }
  signin() {
    const {phone, password} = this;
    const {toTop, dispatch, token} = this.props;
    if(phone == '' || password == '')
    return alert('有未填資訊唷！');
    dispatch(requestLogin(phone, password, token))
    .then(() => {
      Alert.alert('已成功登入', '即將回到首頁', [{
        text: 'OK', onPress: toTop
      }]);
    })
    .catch(() => {
      dispatch(fetchLoginFailed());
      Alert.alert('登入失敗', '請確定填寫是否正確！', [{
        text: 'OK', onPress: () => {}
      }]);
    });
  }
  render() {
    return(
      <KeyboardAwareScrollView style = {styles.container} ref = 'scrollView'>
        <Image
          source = {require('../../img/people.png')}
          style = {styles.image}>
        </Image>
        <View style = {styles.textInputView}>
          <Text style = {styles.label}>
            電話
          </Text>
          <TextInput
            style = {styles.textInput}
            onChangeText = {(text) => {
              this.phone = text;
            }}
            keyboardType = 'numeric'
            selectTextOnFocus = {true}
            selectionColor = {CONSTANTS.mainColor}
            autoCorrect = {false}
            ref = 'textinput1'
            maxLength = {10}
            returnKeyType = "next"
            onSubmitEditing = {() => this.refs.textinput2.focus()}
            onFocus={(event) => {
              this.scrollToInput(event, 'textinput1');
            }}>
          </TextInput>
        </View>
        <View style = {styles.textInputView}>
          <Text style = {styles.label}>
            密碼
          </Text>
          <TextInput
            style = {styles.textInput}
            onChangeText = {(text) => {
              this.password = text;
            }}
            secureTextEntry = {true}
            selectionColor = {CONSTANTS.mainColor}
            autoCorrect = {false}
            ref = 'textinput2'
            returnKeyType = "send"
            onSubmitEditing = {this.signin}
            onFocus={(event) => {
              this.scrollToInput(event, 'textinput2');
            }}>
          </TextInput>
        </View>
        <Button onPress={this.signin}
          buttonText="登入"
        />
      </KeyboardAwareScrollView>
    );
  }
}
function select(state) {
  return {
    token: state.login.info.token
  };
}
export default connect(select)(SigninView);
const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.backgroundColor,
    paddingTop: 80
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
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  textInput: {
    backgroundColor: CONSTANTS.backgroundColor,
    height: 30,
    width: 200,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
  },
  hundredWidth: {
    flexDirection: 'row'
  },
  signin: {
    // height: 40,
    // width:60,
    marginTop: 30,
    paddingVertical: 8,
    paddingHorizontal: 25,
    backgroundColor: CONSTANTS.backgroundColor,
    borderRadius: 3,
    borderColor: CONSTANTS.mainColor,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signinText: {
  },
});
