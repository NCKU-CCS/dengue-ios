/**
* Dengueapp
*
*/

import React, {
    AppRegistry,
    Component
} from 'react-native';

import Nav from './Component.ios/Nav.js';
import CONSTANTS from './Component.ios/Global.js';
import Intro from './Component.ios/Intro/Intro.js';
class DengueFever extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logined: false,
            info: {identity: '一般使用者'},
            swiper: 0,
        };
        this.restart = this.restart.bind(this);
        this.fetchData = this.fetchData.bind(this);
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
        .then((responseData) => {
            this.restart(responseData);
        })
        .catch( () => {
            this.setState({swiper: 1});
        });
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
            this.restart(responseData);
            CONSTANTS.storage.save({
                key: 'loginState',  //注意:请不要在key中使用_下划线符号!
                rawData: responseData,

                //如果不指定过期时间，则会使用defaultExpires参数
                //如果设为null，则永不过期
                expires: 1000 * 60
            });

        })
        .catch((error) => {
            console.warn(error);
        })
        .done();
    }
    restart(info) {
        let logined = info.name === undefined ? false : true;
        if(info.user_uuid === undefined){
            this.fetchData();
        }
        else{
            this.setState({
                info: info,
                logined: logined,
                swiper: -1,
            });
        }

    }
    render() {

        const {swiper} = this.state;
        if(swiper === -1){
            return(
                <Nav restart = {this.restart}
                    loginFast = {this.fetchData}
                    {...this.state} >

                </Nav>
            );
        }
        else if(swiper === 1){
            return <Intro fetchData = {this.fetchData} />;
        }
        else{
            return null;
        }
    }
}





AppRegistry.registerComponent('DengueFever', () => DengueFever);
