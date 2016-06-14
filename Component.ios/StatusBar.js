import React,{
    View,
    StyleSheet,
    Component,
    Text,
    TouchableHighlight
} from 'react-native';
import CONSTANTS from './Global.js';

export default class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusBarDisplay: true,
            backDisplay: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        const falseStatusBarDisplay = [],
        trueBackDisplay = ['showImage', 'eachHospitalInfo', 'signinView'];
        let statusBarDisplay = true,
        backDisplay = false;
        if(falseStatusBarDisplay.indexOf(nextProps.id) !== -1){
            statusBarDisplay = false;
        }
        if(trueBackDisplay.indexOf(nextProps.id) !== -1){
            backDisplay = true;
        }
        this.setState({
            statusBarDisplay: statusBarDisplay,
            backDisplay: backDisplay
        });
    }
    render(){

        if(this.state.statusBarDisplay){
            let Back = <View style={styles.space} />;
            if(this.state.backDisplay){
                Back = (
                    <TouchableHighlight
                        underlayColor = {CONSTANTS.mainColor}
                        onPress={this.props.back}
                        style = {styles.backView}
                    >
                            <Text style={styles.back}>
                                {" 〈  返回"}
                            </Text>
                    </TouchableHighlight>
                );
            }
            return(
                <View style = {styles.statusBar}>
                    {Back}

                    <View style = {styles.title}>
                        <Text style = {styles.titleText}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={styles.space} />
                </View>
            );
        }
        else{
            return null;
        }
    }
}
var styles = StyleSheet.create({
    statusBar: {
        alignItems:'center',
        flexDirection:'row',
        justifyContent: 'center',
        paddingTop:20,
        //paddingBottom:10,
        width: CONSTANTS.screenWidth,
        height: CONSTANTS.statusBarHeight,
        backgroundColor: CONSTANTS.mainColor,
    },
    back: {
        color: "#fff",
        fontSize: 20,
    },
    backView: {
        paddingVertical:5,
        flex:0.25,
    },
    title: {
        flex:0.5,
        alignItems:'center',
    },
    titleText: {
        color: '#fff',
        fontSize: 22,
    },
    space: {
        flex:0.25,
    }
});
