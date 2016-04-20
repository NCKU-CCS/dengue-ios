import React, {
    View,
    Text,
    Component,
    TouchableHighlight,
    Image,
    ActionSheetIOS,
    StyleSheet,
} from 'react-native';


import StatusBar from '../StatusBar.js';
import CONSTANTS from '../Global.js';
var BUTTONS = ['積水', '空屋'];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
export default class BreedingSourceReportList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.showActionSheet = this.showActionSheet.bind(this);
        this.not = this.not.bind(this);
    }
    render() {
        return(
            <View style={styles.container}>

                <Image ref={'img'} style={styles.image} source={{uri: this.props.uri}}>

                </Image>
                <View style={styles.info}>
                    <View style={styles.textView}>
                        <Text
                            style={styles.text}
                            >
                            資料
                        </Text>
                    </View>
                    <View style={styles.textView}>
                        <Text
                            style={styles.text}
                            >
                            資料
                        </Text>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this.showActionSheet}>
                            <Text style={styles.buttonText}>是孳生源</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this.not}>
                            <Text style={styles.buttonText}>不是孳生源</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    not(){
        var props = this.props;
        fetch('http://localhost:1337/breeding_source_report/update/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                done: 'no',
                source_id: props.sourceId,
            })
        })
        .then((response) => response.text())
        .then((responseText) => {

            props._back();
        })
        .catch((error) => {
            console.warn(error);
        });
    }
    showActionSheet() {
        var props = this.props;
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            tintColor: 'green',
        },
        (buttonIndex) => {
            fetch('http://localhost:1337/api/update', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sourceId: props.sourceId,
                    data: BUTTONS[buttonIndex],
                })
            })
            .then((response) => response.text())
            .then((responseText) => {

                props._back();
            })
            .catch((error) => {
                console.warn(error);
            });
        });
    }
}
BreedingSourceReportList.defaultProps = {
    uri:"http://www.opcpest.com/res/images/pest-detail-images/og_mosquito-icon_1.png",
}
var styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
    },
    image: {
        marginTop: 50,
        height: CONSTANTS.screenHeight * 0.5,
        width: CONSTANTS.screenWidth * 0.9,
    },
    info: {
        width: CONSTANTS.screenWidth * 0.9,
        flexDirection:'column',
    },
    textView: {
        flex:1,
        height: 40,
        marginTop: 40,
        justifyContent:'center',
        alignItems:'center',
    },
    buttons: {
        position:"absolute",
        bottom:0,
        width:CONSTANTS.screenWidth,
        flexDirection:'row',
    },
    button: {
        flex:1,
        backgroundColor:"#e54",
        height:40,
        alignItems:'center',
        justifyContent:'center',
    },
})
