import React, {
    Component,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    AlertIOS,
    ScrollView
} from 'react-native';
import CONSTANTS from '../Global.js';
export default class Second extends Component {

    constructor(props) {
        super(props);
        this.state={};
        this.send = this.send.bind(this);
    }
    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    lat:position.coords.latitude,
                    lon:position.coords.longitude,
                });
            },
            (error) => AlertIOS.alert(error.message),
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
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#eee"
                    onPress={this.send.bind(this)}
                >
                    <Text style={styles.buttonText}>報告！這裡有蚊子</Text>
                </TouchableHighlight>
            </ScrollView>
        );


    }
    send() {

        const {lat,lon} = this.state,
            {toTop} = this.props;
        if(lat === '' || lat === ''){
            AlertIOS.alert("未開啟定位服務");
        }
        else{
            let formData = new FormData();
            formData.append('database', 'tainan');
            formData.append('lat', lat);
            formData.append('lng', lon);
            fetch('http://api.denguefever.tw/bite/insert/', {
                method: 'POST',
                headers: {
                    'Accept': 'multipart/form-data',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
            .then(response => {
                if(!response.ok){
                    throw Error(response.status);
                }
                alert('舉報成功!');
                toTop();
            })
            .catch(err => {
                console.warn(err);
                alert('舉報失敗了！');
            });

        }

    }
}

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
        borderRadius: 3,

    },
    buttonText: {
        color: '#fff',
    }


});
