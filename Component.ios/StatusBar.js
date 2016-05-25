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
        const falseStatusBarDisplay = ['breedingSourceReport'],
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
                    >
                        <View style = {styles.backView}>
                            <Text style={styles.back}>
                                {"〈"}
                            </Text>
                        </View>
                    </TouchableHighlight>
                );
            }
            return(
                <View style={styles.statusBar}>
                    {Back}

                    <View style={styles.title}>
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
        paddingBottom:10,
        width: CONSTANTS.screenWidth,
        height:CONSTANTS.statusBarHeight,
        backgroundColor:CONSTANTS.mainColor,
    },
    back: {
        color: "#fff",
        fontSize: 20,
        marginTop:20,
        marginBottom:10,
        marginRight:20,
    },
    backView: {
        //backgroundColor: 'red',
        flex:0.1,
    },
    title: {
        flex:0.8,
        alignItems:'center',
    },
    titleText: {
        color: '#fff',
        fontSize: 22,
    },
    space: {
        flex:0.1,
    }
});
