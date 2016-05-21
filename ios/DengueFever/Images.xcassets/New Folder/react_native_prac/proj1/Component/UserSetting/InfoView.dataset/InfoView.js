import React, {
    Component,
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class InfoView extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const {
            score,
            breeding_source_count,
            bites_count
        } = this.props;
        return (
            <View style = {styles.container}>
                <Text>
                    積分：{score}
                </Text>
                <Text>
                    舉報滋生源：{breeding_source_count}
                </Text>
                <Text>
                    舉報蚊子叮咬：{bites_count}
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({

})
