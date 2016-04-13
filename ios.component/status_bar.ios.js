import React,{
    View,
    StyleSheet,
    Component,
    Text,
    TouchableHighlight
} from 'react-native';
import CONSTANTS from './constants.ios.js';

export default class StatusBar extends Component {
    render(){
        if(this.props.page === 'menu' || this.props.page === 'index'){
            return (
                <View style={styles.statusBar}>
                    <Text>
                        {this.props.title}
                    </Text>
                </View>
            )
        }
        else{
            return(
                <View style={styles.statusBar}>

                    <TouchableHighlight onPress={this.props._back}>
                        <Text style={styles.back}>
                            {"<"}
                        </Text>
                    </TouchableHighlight>
                    <View style={styles.title}>
                        <Text>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={styles.space}>
                    </View>
                </View>
            )
        }

    }
}
var styles = StyleSheet.create({
    statusBar: {
        alignItems:'center',
        flexDirection:'row',
        justifyContent: 'center',
        paddingTop:20,
        width: CONSTANTS.screenWidth,
        height:CONSTANTS.statusBarHeight,
        backgroundColor:CONSTANTS.mainColor,
    },
    back: {
        color: "#fff",
        flex:0.1,
    },
    title: {
        flex:0.8,
        alignItems:'center',
    },
    space: {
        flex:0.1
    },
})
