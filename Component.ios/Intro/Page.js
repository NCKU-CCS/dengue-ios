import React, {
    Component,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import CONSTANTS from '../Global.js';
export default class Intro extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {titleText, imgSource, description, fetchData} = this.props;
        return(
            <View style = {styles.container}>
                <View style = {styles.title}>
                    <Text style = {styles.titleText}>
                        {titleText}
                    </Text>
                </View>
                <Image
                    style = {styles.img}
                    source = {imgSource}
                    />
                <Text style = {styles.description}>
                    {description}
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        backgroundColor: CONSTANTS.backgroundColor,
    },
    title: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 50,
        width: CONSTANTS.screenWidth - 80,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    description: {
        position: 'absolute',
        fontSize: 16,
        color: "#555",
        lineHeight:25,
        bottom: 100,
        paddingHorizontal: 32,
        marginLeft:8,

    },
    img: {
        width: CONSTANTS.screenWidth*0.5,
        height: CONSTANTS.screenWidth*0.5,
        resizeMode: 'contain',
        marginBottom: 40,
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
