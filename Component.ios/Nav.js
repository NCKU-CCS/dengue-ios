import React, {
    Component,
    StyleSheet,
    View,
    Navigator

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
            backDisplay: false,
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
                    id = {this.state.id}
                    back = {this.back}
                    toTop = {this.toTop}
                    loginFast = {this.props.loginFast}
                    restart = {this.props.restart}
                    info = {this.props.info}
                    />
                <Navigator
                    ref="nav"
                    initialRoute={{id: 'hotZoneInfo', title: '熱區資訊'}}
                    renderScene={(route) =>
                        <ContextComponent
                            info = {this.props.info}
                            logined = {this.props.logined}
                            id = {route.id}
                            data = {route.data}
                            title = {this.state.title}
                            enter = {this.enter}
                            back = {this.back}
                            toTop = {this.toTop}
                            restart = {this.props.restart}
                        />
                    }
                />
                <TabBar
                    info = {this.props.info}
                    title = {this.state.title}
                    enter = {this.enter}
                    back = {this.back}
                />
            </View>
        );
    }
    enter(id, title, data) {

        const routeList = this.refs.nav.getCurrentRoutes(),
            route = this.containRoute(id, data, routeList),
            {jumpTo, push} = this.refs.nav;
        if(route){
            jumpTo(route);
        }
        else{
            push({id:id, title:title, data:data});
        }
        this.setState({
            title: title,
            id: id,
        });
    }
    back() {
        const routeList = this.refs.nav.getCurrentRoutes(),
            currentRoute = routeList[routeList.length - 2];
        this.refs.nav.pop();
        this.setState({
            title: currentRoute.title,
            id: currentRoute.id,
        });
    }
    toTop() {
        const firstRoute = this.refs.nav.getCurrentRoutes()[0];
        this.refs.nav.popToTop();
        this.setState({
            title: firstRoute.title,
            id: firstRoute.id,
        });
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
});
