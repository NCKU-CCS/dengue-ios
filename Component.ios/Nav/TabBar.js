import React, {
    Component,
    StyleSheet,
    TabBarIOS,
    Image,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import CONSTANTS from '../Global.js';
import ContextComponent from './ContextComponent.js';

//import Icon from 'react-native-vector-icons/Ionicons';

export default class TabBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            opacity: 1,
        };
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
                            style = {[styles.tabbarItem, this.selected(title[i])]}
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
                                <Text style = {styles.label}>
                                    {title[i]}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    )
                }
            </View>
        );
    }
    selected(title) {
        if(this.props.title === title){
            return styles.selected;
        }
    }
    icon(title) {
        switch (title) {
            case '熱區資訊':
            return require('../../img/rsz_notification_off.png');
            break;
            case '就醫資訊':
            return require('../../img/check_list-31.png');

            break;
            case '孳生源舉報':
            return require('../../img/rsz_source_checkin_off.png');

            break;
            case '蚊子叮咬舉報':
            return require('../../img/rsz_mosquito_checkin_off.png');

            break;
            case '個人資訊':
            return require('../../img/rsz_setting_off.png');

            break;
            case '孳生源列表':
            return require('../../img/check_list-31.png');
            break;
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
        alignItems:'center'
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
    selected: {
        borderColor: CONSTANTS.mainColor,
        borderTopWidth:3,

    },
    label: {
        fontSize:12,
        marginTop:5,
        fontWeight: 'bold',
    }
});
