import React, {
    Component,
    StyleSheet,
    View,
} from 'react-native';
import CONSTANTS from '../Global.js';
import Tab from './Tab.js';
//import Icon from 'react-native-vector-icons/Ionicons';

export default class TabBar extends Component {
    constructor(props){
        super(props);

    }

    render(){
        let menu = [
            "hotZoneInfo",
            "hospitalInfo",
            "breedingSourceReport",
            "mosquitoBiteReport",
            "userSetting",
        ],
        title = [
            '熱區資訊',
            '就醫資訊',
            '環境回報',
            '蚊子叮咬',
            '個人資訊'

        ];
        if(this.props.info.identity === '里長') {
            menu = [
                "hotZoneInfo",
                "hospitalInfo",
                "breedingSourceReport",
                "mosquitoBiteReport",
                "breedingSourceReportList",
                //"userSetting"
            ];
            title = [
                '熱區資訊',
                '就醫資訊',
                '環境回報',
                '蚊子叮咬',
                '孳生源列表',
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
                        (id,i) =>
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
var styles = StyleSheet.create({
    tabbar: {
        height:60,
        backgroundColor: CONSTANTS.backgroundColor,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        borderTopWidth:1,
        borderColor: '#ccc'
    },

});
