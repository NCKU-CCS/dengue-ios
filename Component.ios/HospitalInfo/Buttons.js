import React, {
    Component,
    View,
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';
import CONSTANTS from '../Global.js';
export default class Buttons extends Component {
    constructor(props) {
        super(props);

    }
    typeFocus(type) {
        if(type === this.props.type){
            return styles.focused;
        }
        return null;
    }
    render() {
        const {changeType} = this.props;
        return(
            <View style = {styles.typeButtons}>
                <TouchableHighlight
                    style = {[styles.typeButton, this.typeFocus('全部')]}
                    onPress = {() => {changeType('全部');}}
                    >
                    <Text style={styles.typeText}>
                        全部
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style = {[styles.typeButton, styles.center, this.typeFocus('醫院')]}
                    onPress = {() => {changeType('醫院');}}
                    >
                    <Text style={styles.typeText}>
                        醫院
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style = {[styles.typeButton, this.typeFocus('診所')]}
                    onPress = {() => {changeType('診所');}}
                    >
                    <Text style={styles.typeText}>
                        診所
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    typeButtons: {
        width: CONSTANTS.screenWidth * 0.8,
        marginTop:10,
        flexDirection:'row',
        borderWidth: 1,
        borderColor:'#ccc',
        borderRadius:3,
        alignSelf: 'center',
        marginBottom: 30,
    },
    center: {
        borderLeftWidth: 1,
        borderRightWidth:1,
        borderColor:'#ccc',
    },
    typeButton: {
        alignItems: 'center',
        flex:1,
        padding:10,
    },
    typeText: {
        fontSize: 16,
    },
    focused: {
        backgroundColor: '#ccc',
    },
});
