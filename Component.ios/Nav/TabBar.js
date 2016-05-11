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
                tintColor = "white"
                barTintColor = {CONSTANTS.mainColor}
                >
                {
                    menu.map(
                        (id,i) =>
                        <TabBarIOS.Item
                            key = {title[i]}
                            title = {title[i]}
                            icon={{}}
                            selected={this.props.title === title[i]}
                            onPress={
                                () => {this.props.enter(id, title[i]);}
                            }
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
}
var styles = StyleSheet.create({



});
