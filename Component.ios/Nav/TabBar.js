import React, {
    Component,
    StyleSheet,
    Image,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import CONSTANTS from '../Global.js';

//import Icon from 'react-native-vector-icons/Ionicons';

export default class TabBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            opacity: 1,
        };
        this.icon = this.icon.bind(this);
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
            '孳生源舉報',
            '蚊子叮咬舉報',
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
                '孳生源舉報',
                '蚊子叮咬舉報',
                '孳生源列表',
                //'個人資訊'

            ];
        }
        return(
            <View
                style = {styles.tabbar}
                >
                {
                    menu.map(
                        (id,i) =>
                        <TouchableHighlight
                            key = {title[i]}
                            style = {[styles.tabbarItem, this.selectedTab(title[i])]}
                            onPress={
                                () => {this.props.enter(id, title[i]);}
                            }
                            underlayColor = {CONSTANTS.backgroundColor}
                        >
                            <View
                                style = {styles.view}
                                >
                                <Image
                                    style = {styles.img}
                                    source = {this.icon(title[i])}
                                    >

                                </Image>
                                <Text style = {[styles.label, this.selectedText(title[i])]}>
                                    {title[i]}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    )
                }
            </View>
        );
    }
    selectedTab(title) {
        if(this.props.title === title){
            return styles.selectedTab;
        }
    }
    selectedText(title) {
        if(this.props.title === title){
            return styles.selectedText;
        }
    }
    icon(title) {
        const propsTitle = this.props.title;
        switch (title) {
            case '熱區資訊':
            return propsTitle === title ?
                require('../../img/notification_on.png'):
                require('../../img/notification_off.png');
            case '就醫資訊':
            return propsTitle === title ?
                require('../../img/check_list-32.png'):
                require('../../img/check_list-31.png');
            case '孳生源舉報':
            return propsTitle === title ?
                require('../../img/source-15.png'):
                require('../../img/source-16.png');
            case '蚊子叮咬舉報':
            return propsTitle === title ?
                require('../../img/mosquito_checkin_on.png'):
                require('../../img/mosquito_checkin_off.png');
            case '個人資訊':
            return propsTitle === title ?
                require('../../img/setting_on.png'):
                require('../../img/setting_off.png');
            case '孳生源列表':
            return propsTitle === title ?
            require('../../img/check_list-32.png'):
            require('../../img/check_list-31.png');
            default:

        }
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
    tabbarItem: {
        flex:1,
        //flexDirection: 'column',
        height:60,
        backgroundColor: CONSTANTS.backgroundColor,
        justifyContent: 'center',
        alignItems:'center',
        borderColor: CONSTANTS.backgroundColor,
        borderTopWidth:3,
    },
    view: {
    justifyContent: 'center',
        alignItems:'center',
    },
    img: {
        height:32,
        resizeMode: 'contain',
    },
    selectedTab: {
        //borderColor: CONSTANTS.mainColor,
        //borderTopWidth:3,
    },
    selectedText: {
        color: CONSTANTS.mainColor,
    },
    label: {
        fontSize:10,
        marginTop:5,
        fontWeight: 'bold',
    }
});
