import React, {
    Component,
    StyleSheet,
    TabBarIOS,
} from 'react-native';
import ContextComponent from './ContextComponent.js';
export default class TabBar extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const menu = [
            "hotZoneInfo",
            "hospitalInfo",
            "breedingSourceReport",
            "mosquitoBiteReport",
            "breedingSourceReportList",
        ],
        title = [
            '熱區資訊',
            '就醫資訊',
            '孳生源舉報',
            '蚊子叮咬舉報',
            '孳生源列表'

        ];
        return(
            <TabBarIOS
                tintColor="white"
                barTintColor="darkslateblue"
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
                                data = {this.props.data}
                                back = {this.props.back}
                                enter = {this.props.enter}
                                toTop = {this.props.toTop}
                                />
                        </TabBarIOS.Item>
                    )
                }
            </TabBarIOS>
        );
    }
}
var styles = StyleSheet.create({

    tabBarItem: {
        alignItems:'center',
        flex:1,
    },


});
