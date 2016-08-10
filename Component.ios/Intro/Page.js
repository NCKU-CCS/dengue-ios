import React, {
    Component,
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import CONSTANTS from '../Global.js';
import { requestQuickLogin } from '../../Actions.ios/index.js';
import { styles } from './Page.style.js';
class Page extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { titleText, imgSource, description, dispatch } = this.props;
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
                    onPress = {() => dispatch(requestQuickLogin())}
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
export default connect()(Page);
