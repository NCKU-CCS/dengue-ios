import React, {
    Component,
    StyleSheet,
    View,
    Image,
    TextInput,
    Text,
    TouchableHighlight,
    AlertIOS,
    NativeModules,
    ScrollView,
} from 'react-native';
import InfoView from './InfoView.js';
import SignupView from './SignupView.js';
import CONSTANTS from '../Global.js';

export default class UserSetting extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() {
        const {
            score,
            bites_count,
            breeding_source_count,
        } = this.props.info;
        const {enter, restart, logined} = this.props;

        if(logined){
            return (
                <InfoView
                    score = {score}
                    bites_count = {bites_count}
                    breeding_source_count = {breeding_source_count}
                />
            );
        }
        return (
            <SignupView
                restart = {restart}
                enter = {enter}
            />
        );
    }

}
