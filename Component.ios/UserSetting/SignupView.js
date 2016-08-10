import React, {
  ScrollView,
  Component,
  Image,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CONSTANTS from '../Global.js';
import { requestSignup } from '../../Actions.ios/index.js';
import { connect } from 'react-redux';
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
    //TODO log redux
    // const { dispatch } = this.props;
    //dispatch(requestSignup(name, phone, password));
    let formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('password', password);
    console.log(formData);
    this.props.dispatch(requestSignup(formData));
  }

  render() {
    const {enter} = this.props;
    return(
      <ScrollView style = {styles.container} ref = 'scrollView'>
        <Image
          source = {require('../../img/people.png')}
          style = {styles.image}
          >
          </Image>
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
                  ref = 'textinput3'
                  onFocus = {() => {
                    this.refs.textinput3.measure((x,y,width,height,px,py) => {

                      if(py > CONSTANTS.screenHeight / 2){
                        this.refs.scrollView.scrollTo({y:py-CONSTANTS.screenHeight / 3});
                      }
                    });
                  }}
                  >
                  </TextInput>
                </View>
                <TouchableHighlight
                  onPress = {this.signup}
                  style = {styles.signup}
                  underlayColor = {CONSTANTS.backgroundColor}
                  >
                    <Text style = {styles.signupText}>
                      註冊
                    </Text>
                  </TouchableHighlight>
                  <Text style = {styles.psText}>
                    已經註冊了？
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
                  </ScrollView>
    );
  }
}
export default connect()(SignupView);
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
  signup: {
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
  signupText: {
    fontSize: 20,
  },
  psText: {
    marginTop:30,
    color:"#777",
    alignSelf: 'center',
  },
  login: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  loginText: {
    color:"#00ace6",
    fontSize: 20,
  }


});
