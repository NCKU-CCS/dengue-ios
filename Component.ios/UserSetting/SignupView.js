import React, {
  ScrollView,
  Component,
  Image,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import CONSTANTS from '../Global.js';
import { requestSignup, fetchLoginFailed } from '../../Actions.ios/index.js';
import { connect } from 'react-redux';
import Button from '../Common/Button.js';
import FBLink from '../Common/FBLink.js';
import WebLink from '../Common/WebLink.js';
class SignupView extends Component {
  constructor(props) {
    super(props);
    this.state = {phone: "", password: "", name: ''};
    this.signup = this.signup.bind(this);
  }
  signup() {
    const {
      phone,
      password,
      name
    } = this.state;
    const { dispatch } = this.props;
    const { user_uuid, token } = this.props.info;
    //TODO log redux
    // const { dispatch } = this.props;
    //dispatch(requestSignup(name, phone, password));
    if(phone == '' || password == '' || name == '') {
      return alert('有未填資訊唷！');
    }
    const data = {
      name,
      phone,
      password,
      user_uuid
    }
    dispatch(requestSignup(data, token))
    .then(() => {
      Alert.alert('已成功註冊','登入並回到首頁',[{
        text: 'OK', onPress: this.props.toTop
      }])
    })
      .catch((error) => {
        dispatch(fetchLoginFailed());
        Alert.alert('不好意思！註冊出了問題','請確認資料填寫確實，若有任何疑問也請回報給我們：）',[{
          text: 'OK', onPress: () => {}
        }])
      });
  }

  render() {
    const {enter} = this.props;
    return(
      <ScrollView style = {styles.container} ref = 'scrollView'>
        <Image
          source = {require('../../img/people.png')}
          style = {styles.image}
        />
        <View style = {styles.textInputView}>
          <Text style = {styles.label}>
            姓名
          </Text>
          <TextInput
            style = {styles.textInput}
            onChangeText = {(text) => this.setState({name: text})}
            value = {this.state.text}
            keyboardType = 'default'
            selectTextOnFocus = {true}
            autoCorrect = {false}
            ref = 'textinput1'
            returnKeyType = "next"
            onSubmitEditing = {() => this.refs.textinput2.focus()}
            onFocus = {() => {
              this.refs.textinput1.measure((x,y,width,height,px,py) => {
                  if(py > CONSTANTS.screenHeight / 2){
                    this.refs.scrollView.scrollTo({y: py - 200});
                  }
                });
              }}
          />
        </View>
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
            autoCorrect = {false}
            ref = 'textinput2'
            returnKeyType = "next"
            onSubmitEditing = {() => this.refs.textinput3.focus()}
            maxLength = {10}
            onFocus = {() => {
              this.refs.textinput2.measure((x,y,width,height,px,py) => {

                if(py > CONSTANTS.screenHeight / 2){
                  this.refs.scrollView.scrollTo({y:py - 200});
                }
              });
            }}
          />
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
            autoCorrect = {false}
            ref = 'textinput3'
            returnKeyType = "send"
            onSubmitEditing = {this.signup}
            onFocus = {() => {
              this.refs.textinput3.measure((x,y,width,height,px,py) => {

                if(py > CONSTANTS.screenHeight / 2){
                  this.refs.scrollView.scrollTo({y: py - 200});
                }
              });
            }}
          />
        </View>
        <Button onPress={this.signup} buttonText="註冊"/>
        <Text style = {styles.psText}>
          ———  已經註冊了?  ———
        </Text>
        <TouchableHighlight
          style = {styles.login}
          onPress = {() => {enter('signinView', "個人資訊");}}
          underlayColor = {CONSTANTS.backgroundColor}
        >
          <Text style = {styles.loginText}>
            登入
          </Text>
        </TouchableHighlight>
        <FBLink />
        <WebLink />
        <View style={styles.footer}/>
      </ScrollView>
    );
  }
}
function select(state) {
  return {
    info: state.login.info
  };
}
export default connect(select)(SignupView);
const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.backgroundColor,
    paddingTop: 80,
  },
  image: {
    marginTop: 30,
    height: 100,
    width: 100,
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
    alignSelf: 'center',
  },
  hundredWidth: {
    flexDirection: 'row'
  },
  signup: {
    //height: 40,
    width:200,
    marginTop: 30,
    paddingVertical: 8,
    //paddingHorizontal: 25,
    backgroundColor: CONSTANTS.backgroundColor,
    borderRadius :5,
    borderColor: CONSTANTS.mainColor,
    borderWidth:1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

  },
  signupText: {
    fontSize: 20,
    color: '#444',
  },
  psText: {
    marginVertical: 10,
    color:"#777",
    alignSelf: 'center',
  },
  login: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  loginText: {
    color:"#00ace6",
    fontSize: 20,
  },
  footer: {
    marginBottom: 50,
  }


});
