import React, {
    Component,
    StyleSheet,
    TabBarIOS,
} from 'react-native';
import CONSTANTS from '../Global.js';
import ContextComponent from './ContextComponent.js';
export default class TabBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            opacity: 1,
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.id === 'breedingSourceReport'){
            this.setState({
                opacity: 0
            })
        }
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
            ],
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
            <TabBarIOS
                tintColor = {CONSTANTS.mainColor}
                barTintColor = '#eee'
                >
                {
                    menu.map(
                        (id,i) =>
                        <TabBarIOS.Item
                            key = {title[i]}
                            title = {title[i]}
                            icon={this.icon(title[i])}
                            selected={this.props.title === title[i]}
                            onPress={
                                () => {this.props.enter(id, title[i]);}
                            }
                            style = {styles.tabbarItem}
                            >
                            <ContextComponent
                                id = {this.props.id}
                                info = {this.props.info}
                                data = {this.props.data}
                                back = {this.props.back}
                                enter = {this.props.enter}
                                toTop = {this.props.toTop}
                                logined = {this.props.logined}
                                restart = {this.props.restart}
                                />
                        </TabBarIOS.Item>
                    )
                }
            </TabBarIOS>
        );
    }
    icon(title) {
        switch (title) {
            case '熱區資訊':
                return require('../../img/rsz_notification_off.png');
                break;
            case '就醫資訊':
            return require('../../img/rsz_hospital_off.png');

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
                return require('../../img/rsz_hospital_off.png');
                break;
            default:

        }
    }
}
var styles = StyleSheet.create({
    tabbarItem: {
        height: CONSTANTS.screenHeight - 50,
        flexDirection: 'column',
    }

});
