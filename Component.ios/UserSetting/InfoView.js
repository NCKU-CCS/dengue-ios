import React, {
    Component,
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import CONSTANTS from '../Global.js';
export default class InfoView extends Component {

    constructor(props) {
        super(props);
        this.signout = this.signout.bind(this);
    }
    signout() {
        fetch('http://140.116.247.113:11401/users/signout/')
        .then((response) => {
            if(!response.ok){
                throw Error(response.status);
            }
            //let sessionid = response.headers.map['set-cookie'][0].match(/sessionid=([^;]+);/)[1];
            //return [sessionid, response.json()];
            this.props.restart({});
        })
        .catch(err => {
            console.warn(err);
        });
    }
    render() {
        const {
            score,
            breeding_source_count,
            bites_count
        } = this.props;
        return (
            <View style = {styles.container}>
                <View style = {styles.texts}>
                <Text style = {styles.text}>
                    積分：{score}
                </Text>
                <Text style = {styles.text}>
                    舉報滋生源：{breeding_source_count}
                </Text>
                <Text style = {styles.text}>
                    舉報蚊子叮咬：{bites_count}
                </Text>
            </View>
                <TouchableHighlight style = {styles.button}
                    onPress = {this.signout}
                >
                    <Text>
                        登出
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    texts: {

    },
    text: {
        fontSize: 25,
        marginTop: 30,
    },
    button: {
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
    }
})
