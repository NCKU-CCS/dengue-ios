import React, {
    View,
    Text,
    Component,
    Image,
    StyleSheet,
} from 'react-native';


import StatusBar from '../StatusBar.js';
import CONSTANTS from '../Global.js';
var CANCEL_INDEX = 4;
export default class BreedingSourceReportList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return(
            <View style={styles.container}>

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

            </View>
        )
    }

}
BreedingSourceReportList.defaultProps = {
}
var styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
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

})
