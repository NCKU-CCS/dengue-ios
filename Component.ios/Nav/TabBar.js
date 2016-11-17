import React, {
  Component,
  StyleSheet,
  View,
} from 'react-native';
import CONSTANTS from '../Global.js';
import Tab from './Tab.js';
// import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let menu = [
      'hotZoneInfo',
      'hospitalInfo',
      'breedingSourceReport',
      'mosquitoBiteReport',
      'userSetting',
    ];
    let title = [
        '即時疫情',
        '就醫資訊',
        '環境回報',
        '蚊子叮咬',
        '個人資訊'
    ];
    // use is logined
    if(this.props.login.quick === false) {
      menu = [
        'hotZoneInfo',
        'hospitalInfo',
        'breedingSourceReport',
        'mosquitoBiteReport',
        'breedingSourceReportList',
        //"userSetting"
      ];
      title = [
        '即時疫情',
        '就醫資訊',
        '環境回報',
        '蚊子叮咬',
        '回報點列表',
        //'個人資訊'

      ];
    }
    const propsTitle = this.props.title;
    return(
      <View
      style = {styles.tabbar}
      >
      {
        menu.map(
          (id, i) =>
            <Tab
              enter = {this.props.enter}
              key = {id}
              title = {propsTitle}
              tabTitle = {title[i]}
              id = {id}
            />
        )
      }
      </View>
    );
  }

}
function select(state) {
  return {
    login: state.login
  };
}
export default connect(select)(TabBar);
let styles = StyleSheet.create({
  tabbar: {
    height: 60,
    backgroundColor: CONSTANTS.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc'
  },
});
