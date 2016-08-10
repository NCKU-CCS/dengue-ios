import React, {
    Component,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';
import CONSTANTS from '../Global.js';
import { connect } from 'react-redux';
import { requestLogout } from '../../Actions.ios/index.js';
class InfoView extends Component {

    constructor(props) {
      super(props);
      this.signout = this.signout.bind(this);
    }
    signout() {
      const { dispatch } = this.props;
      dispatch(requestLogout());
    }
    render() {
        const {
            score,
            breeding_source_count,
            bites_count,
            dispatch,

        } = this.props;
        return (
            <View style = {styles.container}>
                <Image
                    source = {require('../../img/people.png')}
                    style = {styles.image}
                    >
                </Image>
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
export default connect()(InfoView);
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: CONSTANTS.backgroundColor,
        flex: 1,
        paddingTop: 30,
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
});
