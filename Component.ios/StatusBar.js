import React,{
  View,
  StyleSheet,
  Component,
  Text,
  TouchableHighlight
} from 'react-native';
import CONSTANTS from './Global.js';
import { connect } from 'react-redux';
import { requestLogout } from '../Actions.ios/index.js';

class StatusBar extends Component {
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
  render() {
    const { dispatch, info, title } = this.props;
    let subTitle = undefined;
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
      if(info.name !== undefined){
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
      if(title === '環境回報') {
        subTitle = '請拍積水髒亂處';
      }
      return(
        <View style = {styles.statusBar}>
          {Back}

          <View style = {styles.title}>
            <Text style = {styles.titleText}>
              {title}
              </Text>
              <Text style = {styles.subTitle}>
                {subTitle}
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
  logout() {
    this.props.dispatch(requestLogout())
      .then(this.props.toTop);
  }
}
function select(state) {
  return {

  };
}
export default connect(select)(StatusBar);
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
    fontSize: 15,
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
  subTitle: {
    color: '#fff',
    fontSize: 14,
    lineHeight:15,
    marginBottom: 10,
  },
  logout: {
    color: "#fff",
    fontSize: 15,
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
