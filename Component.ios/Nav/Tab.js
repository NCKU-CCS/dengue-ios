import React,{
    Component,
    View,
    TouchableHighlight,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import CONSTANTS from '../Global.js';

export default class Tab extends Component {
    constructor(props) {
        super(props);
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
            case '即時疫情':
            return propsTitle === title ?
                require('../../img/notification_on.png'):
                require('../../img/notification_off.png');
            case '就醫資訊':
            return propsTitle === title ?
                require('../../img/check_list-32.png'):
                require('../../img/check_list-31.png');
            case '環境回報':
            return propsTitle === title ?
                require('../../img/source-15.png'):
                require('../../img/source-16.png');
            case '蚊子叮咬':
            return propsTitle === title ?
                require('../../img/mosquito_checkin_on.png'):
                require('../../img/mosquito_checkin_off.png');
            case '個人資訊':
            return propsTitle === title ?
                require('../../img/setting_on.png'):
                require('../../img/setting_off.png');
            case '回報點列表':
            return propsTitle === title ?
            require('../../img/check_list-32.png'):
            require('../../img/check_list-31.png');
            default:

        }
    }
    render() {
        const {tabTitle, id, enter} = this.props;
        return(
            <TouchableHighlight
                key = {tabTitle}
                style = {[styles.tabbarItem, this.selectedTab(tabTitle)]}
                onPress={
                    () => {enter(id, tabTitle);}
                }
                underlayColor = {CONSTANTS.backgroundColor}
            >
                <View
                    style = {styles.view}
                    >
                    <Image
                        style = {styles.img}
                        source = {this.icon(tabTitle)}
                        >

                    </Image>
                    <Text style = {[styles.label, this.selectedText(tabTitle)]}>
                        {tabTitle}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
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
