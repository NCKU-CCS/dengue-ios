/**
* Dengueapp
*
*/

import React, {
    AppRegistry,
    Component,
    TextInput,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Dimensions,
} from 'react-native';

import Nav from './Component.ios/Nav.js';
import CONSTANTS from './Component.ios/Global.js';
import StatusBar from './Component.ios/StatusBar.js';
class DengueFever extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logined: false,
            info: {identity: '一般使用者'},
        };
        this.restart = this.restart.bind(this);
    }

    componentDidMount() {
        this.getLoginState();
    }
    getLoginState() {
        /*
        check whether the app was used before,
        if yes, get user info,
        otherwise, signupfast

        */
        CONSTANTS.storage.load({
            key: 'loginState',

            //autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: false,

            //syncInBackground(默认为true)意味着如果数据过期，
            //在调用同步方法的同时先返回已经过期的数据。
            //设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        })
        .then( () => {
            //如果找到数据，则在then方法中返回

            return fetch('http://140.116.247.113:11401/users/info/');
        })
        .then((response) => {
            if(!response.ok){
                throw Error(response.status);
            }
            return response.json();
        })
        .then((responseData) => {
            let logined = responseData.name === '' ? false : true;
            console.log(logined);
            this.setState({
                info: responseData,
                logined: logined,
            })
            CONSTANTS.storage.save({
                key: 'loginState',  //注意:请不要在key中使用_下划线符号!
                rawData: {
                    user_uuid: responseData.user_uuid,
                    //phone: phone,
                    //password: password,
                },

                //如果不指定过期时间，则会使用defaultExpires参数
                //如果设为null，则永不过期
                expires: null
            });
        })
        .catch( err => {
            this.fetchData();
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })
    }
    fetchData() {
        fetch("http://140.116.247.113:11401/users/signup/fast/")
        .then((response) => {
            if(!response.ok){
                throw Error(response.status);
            }
            //let sessionid = response.headers.map['set-cookie'][0].match(/sessionid=([^;]+);/)[1];
            //return [sessionid, response.json()];
            return response.json();
        })
        .then((responseData) => {
            //let sessionid = responseData[0];
            //let user_uuid = responseData[1].user_uuid;
            let user_uuid = responseData.user_uuid;
            CONSTANTS.storage.save({
                key: 'loginState',  //注意:请不要在key中使用_下划线符号!
                rawData: {
                    user_uuid: user_uuid,
                    //sessionid: sessionid,
                },

                //如果不指定过期时间，则会使用defaultExpires参数
                //如果设为null，则永不过期
                expires:  null
            });
        })
        .catch((error) => {
            console.warn(error);
        })
        .done();
    }
    restart(info) {
        this.setState({
            info: info,
            logined: true,
        })
    }
    render() {
        return(
            <Nav restart={this.restart} {...this.state}></Nav>
        )
    }
}



var styles = StyleSheet.create({
    logo:{
        width: CONSTANTS.screenWidth * 0.8,
        height: CONSTANTS.screenHeight * 0.6,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CONSTANTS.backgroundColor,
    },
    inputs: {
        width: CONSTANTS.screenWidth * 0.9,

    },
    buttons: {
        flexDirection: 'row',
        width: CONSTANTS.screenWidth * 0.9,

    },
    button: {
        flex:1,
        backgroundColor:CONSTANTS.mainColor,
        height: 40,
        padding: 5,
        borderRadius :1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color:'#fff',

    },
    blank: {
        width:10,
    },
    textInput: {
        height: 40,
        backgroundColor: "#ffffff",
        justifyContent:'center',
        marginBottom:20
    }

});

AppRegistry.registerComponent('DengueFever', () => DengueFever);
