import React, {
    Component,
    StyleSheet,
    View,
    Navigator,

} from 'react-native';
import CONSTANTS from './Global.js';

import StatusBar from './StatusBar.js';
import ContextComponent from './Nav/ContextComponent.js';
import TabBar from './Nav/TabBar.js';
export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"熱區資訊",
            statusBarDisplay: true,
        };
        this.enter = this.enter.bind(this);
        this.back = this.back.bind(this);
        this.toTop = this.toTop.bind(this);
    }
    render() {
        return (
            <View style = {styles.container}>
                <StatusBar
                    title = {this.state.title}
                    display = {this.state.statusBarDisplay}
                    back = {this.back}
                    toTpp = {this.toTop}
                    />
                <Navigator
                    ref="nav"
                    initialRoute={{id: 'hotZoneInfo', title: '熱區資訊'}}
                    renderScene={(route) =>
                            <TabBar
                                id = {route.id}
                                data = {route.data}
                                title = {this.state.title}
                                enter = {this.enter}
                                back = {this.back}
                                toTpp = {this.toTop}
                            />

                    }
                />

            </View>
        );
    }
    enter(id, data) {
        let title;
        switch (id) {
            case 'mosquitoBiteReport':
                title='蚊子叮咬舉報';
                break;
            case 'breedingSourceReport':
                title='孳生源舉報';
                break;
            case 'showImage':
                title='孳生源舉報';
                break;
            case 'breedingSourceReportList':
                title='孳生源列表';
                break;
            case 'hotZoneInfo':
                title='熱區資訊';
                break;
            case 'hospitalInfo':
                title='就醫資訊';
                break;
            case 'eachHospitalInfo':
                title='就醫資訊';
                break;
            default:
                break;
        }
        this.setState({
            title: title
        })
        this.refs.nav.push({id:id, data:data});
    }
    back() {
        this.refs.nav.pop();
    }
    toTop() {
        this.refs.nav.popToTop();
    }

}
var styles = StyleSheet.create({
    texts: {
        color: '#000',
    },
    container: {
        flexDirection: 'column',
        width: CONSTANTS.screenWidth,
        height: CONSTANTS.screenHeight,
    },
});
