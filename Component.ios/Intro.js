import React, {
    Component,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import CONSTANTS from './Global.js';
export default class Intro extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const {fetchData} = this.props;
        return(
            <Swiper showsButtons = {true}>
                <View style = {styles.container}>
                    <Text style = {styles.title}>
                        即時熱區資訊
                    </Text>
                    <Image
                        style = {styles.img}
                        source = {require('../img/iPhone6-Flat-21.png')}
                        />
                    <Text style = {styles.description}>
                        掌握即時登革熱熱區，了解哪些地區較危險需避開。
                    </Text>
                    <TouchableHighlight
                        style = {styles.button}
                        underlayColor = {CONSTANTS.backgroundColor}
                        onPress = {()=>{fetchData();}}
                    >
                        <Text
                            style = {styles.buttonText}
                        >
                            直接開始
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style = {styles.container}>
                    <Text style = {styles.title}>
                        鄰近的醫療院所
                    </Text>
                    <Image
                        style = {styles.img}
                        source = {require('../img/iPhone6-Flat-22.png')}
                        />
                    <Text style = {styles.description}>
                        快速了解鄰近能快篩的醫院診所和相關資訊。
                    </Text>
                    <TouchableHighlight
                        style = {styles.button}
                        underlayColor = {CONSTANTS.backgroundColor}
                        onPress = {()=>{fetchData();}}
                    >
                        <Text
                            style = {styles.buttonText}
                        >
                            直接開始
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style = {styles.container}>
                    <Text style = {styles.title}>
                        舉報問題點
                    </Text>
                    <Image
                        style = {styles.img}
                        source = {require('../img/iPhone6-Flat-23.png')}
                        />
                    <Text style = {styles.description}>
                        輕鬆舉報周邊孳生源，讓防疫網更加沒有漏洞，也能舉報蚊子，供自己紀錄自身狀況。
                    </Text>
                    <TouchableHighlight
                        style = {styles.button}
                        underlayColor = {CONSTANTS.backgroundColor}
                        onPress = {()=>{fetchData();}}
                    >
                        <Text
                            style = {styles.buttonText}
                        >
                            直接開始
                        </Text>
                    </TouchableHighlight>
                </View>
            </Swiper>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 70,
        backgroundColor: CONSTANTS.backgroundColor,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: "#555",
        lineHeight:25,
    },
    img: {
        width: CONSTANTS.screenWidth*0.7,
        resizeMode: 'contain',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: CONSTANTS.mainColor,

    },
    buttonText: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        color: CONSTANTS.mainColor,
        fontSize: 25,
    }
});
