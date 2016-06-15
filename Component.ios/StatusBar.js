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
        this.logout = this.logout.bind(this);
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
    logout() {
        fetch("http://140.116.247.113:11401/users/signout/")
        .then((response) => {
            if(response.ok){
                this.props.loginFast();
                alert('已登出！') ;

            }
            else{
                throw Error("");
            }
        })
        .catch(() => {console.warn('登出問題');});
    }
    render() {

        if(this.state.statusBarDisplay){
            let Back = <View style = {styles.space} />,
                Logout = <View style = {styles.space} />;
            if(this.state.backDisplay){
                Back = (
                    <TouchableHighlight
                        underlayColor = {CONSTANTS.mainColor}
                        onPress={this.props.back}
                        style = {styles.backView}
                    >
                            <Text style={styles.back}>
                                {"〈  返回"}
                            </Text>
                    </TouchableHighlight>
                );
            }
            if(this.props.info.name !== undefined){
                Logout = (
                    <TouchableHighlight
                        underlayColor = {CONSTANTS.mainColor}
                        onPress = {this.logout}
                        style = {styles.logoutView}
                    >
                            <Text style={styles.logout}>
                                {"登出"}
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
                    {Logout}
                </View>
            );
        }
        else{
            return null;
        }
    }
}
const styles = StyleSheet.create({
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
        paddingLeft: 20,
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
    logout: {
        color: "#fff",
        fontSize: 20,
        alignSelf: 'flex-end',
        paddingRight:25,
    },
    logoutView: {
        paddingVertical:5,
        flex:0.25,
    },
    space: {
        flex:0.25,
    }
});
