import React, {
    ScrollView,
    Component,
    Image,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CONSTANTS from '../Global.js';

export default class SignupView extends Component {
    constructor(props) {
        super(props);
        this.state = {phone: "", password: "", logined: props.logined};
        this.signup = this.signup.bind(this);
        this.signin = this.signin.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            logined: nextProps.logined,
        });
    }
    signup() {
        let {
            phone,
            password
        } = this.state;
        let formData = new FormData();
        formData.append('phone', phone);
        formData.append('password', password);
        console.log(formData);
        /*fetch('http://140.116.247.113:11401/users/signup/', {
        method: 'POST',
        headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
        },
        body: formData
        })
        .then((response) => {
        if(!response.ok){
        throw Error(response.status);
        }
        return fetch('http://140.116.247.113:11401/users/info/');
        })
        .then((response) => {

        if(!response.ok){
        throw Error(response.status);
        }
        return response.json();
        })
        .then((responseData) => {
        this.restart(responseData);
        CONSTANTS.storage.save({
        key: 'loginState',  //注意:请不要在key中使用_下划线符号!
        rawData: {
        user_uuid: responseData.user_uuid,
        },

        //如果不指定过期时间，则会使用defaultExpires参数
        //如果设为null，则永不过期
        expires: null
        });
        alert('註冊成功！') ;
        })
        .catch((error) => {

        console.warn(error);
        alert("不好意思！註冊出了問題，請等候維修：）");
        });*/
    }
    signin() {
        let {phone, password} = this.state;
        let {restart} = this.props;
        let formData = new FormData();
        formData.append('phone', phone);
        formData.append('password', password);
        fetch('http://140.116.247.113:11401/users/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        .then(response =>{
            if(!response.ok){
                throw Error(response.status);
            }
            return fetch('http://140.116.247.113:11401/users/info/');
        })
        .then(response => {
            if(!response.ok){
                throw Error(response.status);
            }
            return response.json();
        })
        .then(responseData => {
            restart(responseData);
            CONSTANTS.storage.save({
                key: 'loginState',  //注意:请不要在key中使用_下划线符号!
                rawData: {
                    user_uuid: responseData.user_uuid,
                },

                //如果不指定过期时间，则会使用defaultExpires参数
                //如果设为null，则永不过期
                expires: null
            });
            AlertIOS.alert(
                '登入成功'
            );
        })
        .catch(err => {
            AlertIOS.alert(
                '登入失敗'
            );
            console.warn(err);
        });
    }
    render() {
        return(
            <ScrollView style = {styles.container}>
                <Image
                    source = {{ uri : "http://www.opcpest.com/res/images/pest-detail-images/og_mosquito-icon_1.png" }}
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
                        >
                    </TextInput>
                </View>
                <TouchableHighlight
                    onPress = {this.signup}
                    style = {styles.signup}
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
                    onPress = {this.signin}
                    >
                    <Text style = {styles.loginText}>
                        登入
                    </Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

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

    },
    psText: {
        marginTop:30,
        color:"#777",
        alignSelf: 'center',
    },
    login: {
        alignSelf: 'center',
    },
    loginText: {
        color:"#00ace6",
    }


});
