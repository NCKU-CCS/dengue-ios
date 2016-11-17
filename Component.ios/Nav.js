import React, {
  Component,
  StyleSheet,
  View,
  Navigator,
  Text,
  TouchableHighlight,
  Alert,
  Image
} from 'react-native';
import CONSTANTS from './Global.js';
import {connect} from 'react-redux';
import ContextComponent from './Nav/ContextComponent.js';
import TabBar from './Nav/TabBar.js';
import PopImage from './Nav/PopImage.js';
import {changeStatus, requestQuickLogin, flipToggle} from '../Actions.ios/index.js';
import Spinner from 'react-native-loading-spinner-overlay';
class Nav extends Component {
  constructor(props) {
    super(props);
    this.enter = this.enter.bind(this);
    this.back = this.back.bind(this);
    this.toTop = this.toTop.bind(this);
    this.logout = this.logout.bind(this);
    this.flipMap = this.flipMap.bind(this);
  }
  flipMap() {
    this.props.dispatch(flipToggle());
  }
  render() {
    const {status, isFetching, quickLogin, flip} = this.props;
    return (
      <View style = {styles.container}>
        <Navigator
          ref="nav"
          initialRoute = {status}
          renderScene={
            route =>
            <ContextComponent
              route = {route}
              title = {status.title}
              enter = {this.enter}
              back = {this.back}
              toTop = {this.toTop}
            />
          }
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                  if (['showImage', 'eachHospitalInfo', 'signinView'].indexOf(route.id) !== -1) {
                    return <TouchableHighlight
                      underlayColor = {CONSTANTS.mainColor}
                      onPress={this.back}>
                      <Text style={[styles.text, styles.leftButton, styles.lowerTitle]}>
                        {'〈  返回'}
                      </Text>
                    </TouchableHighlight>;
                  } else if (route.id === 'hotZoneInfo') {
                    return <TouchableHighlight
                      onPress={this.flipMap}
                      underlayColor = {CONSTANTS.mainColor}>
                      <Image source={require('../img/flipMap.png')} style={[styles.flipMap, styles.lowerTitle]}/>
                    </TouchableHighlight>;
                  }
                  return null;
                },
                RightButton: (route, navigator, index, navState) => {
                  if (quickLogin !== true) {
                    return <TouchableHighlight
                      underlayColor = {CONSTANTS.mainColor}
                      onPress = {this.logout}>
                      <Text style={[styles.text, styles.rightButton, styles.lowerTitle]}>
                        {'登出'}
                      </Text>
                    </TouchableHighlight>;
                  }
                },
                Title: (route, navigator, index, navState) => {
                  let subTitle=null;
                  if(route.title === '環境回報')
                  subTitle = '請拍積水、髒亂處';
                  let title = route.title;
                  if (route.id === 'hotZoneInfo') {
                    if (flip === false)
                    title = '疫情地圖';
                    else title = '熱區地圖';
                  }
                  return <View style = {styles.titleView}>
                    <Text style = {[styles.text, styles.title, subTitle ? null : styles.lowerTitle]}>
                      {title}
                    </Text>
                    <Text style = {[styles.text, styles.subTitle]}>
                      {subTitle}
                    </Text>
                  </View>;
                },
              }}
              style={{backgroundColor: CONSTANTS.mainColor}}
            />
          }
        />
        <TabBar
          title = {status.title}
          enter = {this.enter}
          back = {this.back}
        />
        <PopImage
          id = {status.id}
          back = {this.back}
          toTop = {this.toTop}
        />
        <Spinner visible={isFetching} />
      </View>
    );
  }
  enter(id, title, data) {
    // TODO change nav to redux
    const routeList = this.refs.nav.getCurrentRoutes();
    const route = this.containRoute(id, data, routeList);
    const {jumpTo, push} = this.refs.nav;
    if(route)
    jumpTo(route);
    else
    push({id: id, title: title, data: data});
    this.props.dispatch(changeStatus(title, id));
  }
  back() {
    const routeList = this.refs.nav.getCurrentRoutes();
    const currentRoute = routeList[routeList.length - 2];
    this.refs.nav.pop();
    this.props.dispatch(changeStatus(currentRoute.title, currentRoute.id, ));
  }
  toTop() {
    const firstRoute = this.refs.nav.getCurrentRoutes()[0];
    this.refs.nav.popToTop();
    this.props.dispatch(changeStatus(firstRoute.title, firstRoute.id));
  }
  containRoute(routeId, routeData, routeList) {
    for(let x in routeList) {
      if(routeId === routeList[x].id && routeData === routeList[x].data)
      return routeList[x];
    }
    return false;
  }
  logout() {
    this.props.dispatch(requestQuickLogin())
    .then(() => {
      Alert.alert('已登出', '即將回到首頁',
      [{text: 'OK', onPress: this.toTop}]
    );
  });
}
}
function select(state) {
  return {
    status: state.status,
    isFetching: state.login.isFetching,
    quickLogin: state.login.quick,
    flip: state.hotZoneInfo.flip
  };
}
export default connect(select)(Nav);
let styles = StyleSheet.create({
  texts: {
    color: '#000',
  },
  sceneStyle: {
    flexDirection: 'column',
    flex: 1,
    height: CONSTANTS.screenHeight - 50,
  },
  container: {
    flexDirection: 'column',
    width: CONSTANTS.screenWidth,
    height: CONSTANTS.screenHeight,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  titleView: {
    alignItems: 'center',
  },
  lowerTitle: {
    marginTop: 10
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: 14,
  },
  leftButton: {
    marginLeft: 10,
  },
  flipMap: {
    width: 30,
    height: 30,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  rightButton: {
    marginRight: 30,
  }
});
