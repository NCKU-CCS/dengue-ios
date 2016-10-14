import React, {
  Component,
  StyleSheet,
  View,
  Navigator,
  Text,
  TouchableHighlight,
} from 'react-native';
import CONSTANTS from './Global.js';
import { connect } from 'react-redux';
import StatusBar from './StatusBar.js';
import ContextComponent from './Nav/ContextComponent.js';
import TabBar from './Nav/TabBar.js';
import PopImage from './Nav/PopImage.js';
import PopImageBackground from './Nav/PopImageBackground.js';
import { changeStatus } from '../Actions.ios/index.js';
import Spinner from 'react-native-loading-spinner-overlay';
class Nav extends Component {
  constructor(props) {
    super(props);
    this.enter = this.enter.bind(this);
    this.back = this.back.bind(this);
    this.toTop = this.toTop.bind(this);
  }
  render() {
    const { status, isFetching, quickLogin } = this.props;
    return (
      <View style = {styles.container}>
        <Navigator
            ref="nav"
            initialRoute = {status}
            renderScene={
              route =>
              <ContextComponent
                id = {route.id}
                data = {route.data}
                title = {status.title}
                enter = {this.enter}
                back = {this.back}
                toTop = {this.toTop}
              />
            }
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) =>
                  {
                    if (['showImage', 'eachHospitalInfo', 'signinView'].indexOf(route.id) !== -1)
                      return <TouchableHighlight
                        underlayColor = {CONSTANTS.mainColor}
                        onPress={this.back}
                      >
                        <Text style={styles.text}>
                          {"〈  返回"}
                        </Text>
                      </TouchableHighlight>;
                    return null;
                  },
                  RightButton: (route, navigator, index, navState) =>
                  {
                    if (quickLogin !== true)
                      return <TouchableHighlight
                        underlayColor = {CONSTANTS.mainColor}
                        onPress = {this.logout}
                        >
                          <Text style={stlyes.text}>
                            {"登出"}
                          </Text>
                        </TouchableHighlight>;
                  },
                  Title: (route, navigator, index, navState) =>
                  {
                    let subTitle=null;
                    if(route.title === '環境回報')
                      subTitle = '請拍積水、髒亂處';
                    return <View style = {styles.titleView}>
                      <Text style = {[styles.text,styles.title]}>
                        {route.title}
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
            />
        <Spinner visible={isFetching} />
      </View>
    );
  }
  enter(id, title, data) {
    //TODO change nav to redux
    const routeList = this.refs.nav.getCurrentRoutes(),
      route = this.containRoute(id, data, routeList),
      {jumpTo, push} = this.refs.nav;
    if(route){
      jumpTo(route);
    }
    else{
      push({id:id, title:title, data:data});
    }
    this.props.dispatch(changeStatus(title, id));
  }
  back() {
    const routeList = this.refs.nav.getCurrentRoutes(),
      currentRoute = routeList[routeList.length - 2];
    this.refs.nav.pop();
    this.props.dispatch(changeStatus(currentRoute.title,currentRoute.id,));
  }
  toTop() {
    const firstRoute = this.refs.nav.getCurrentRoutes()[0];
    this.refs.nav.popToTop();
    this.props.dispatch(changeStatus(firstRoute.title, firstRoute.id));
  }
  containRoute(routeId, routeData, routeList) {
    for(let x in routeList){
      if(routeId === routeList[x].id && routeData === routeList[x].data){
        return routeList[x];
      }
    }
    return false;
  }

}
function select(state) {
  return {
    status: state.status,
    isFetching: state.login.isFetching,
    quickLogin: state.login.quick,
  };
}
export default connect(select)(Nav);
var styles = StyleSheet.create({
  texts: {
    color: '#000',
  },

  sceneStyle: {
    flexDirection:'column',
    flex:1,
    height: CONSTANTS.screenHeight - 50,
  },
  container: {
    flexDirection: 'column',
    width: CONSTANTS.screenWidth,
    height: CONSTANTS.screenHeight,
  },

  text: {
    color: 'white',
  },
  titleView: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: 14,
  },
});
