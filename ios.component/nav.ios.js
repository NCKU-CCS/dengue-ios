import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Navigator } from 'react-native';
import EachBreedingSourceReport from './breeding_source_report_list/each_breeding_source_report.ios.js';
import BreedingSourceReportList from './breeding_source_report_list/breeding_source_report_list.ios.js';
import BreedingSourceReport from './breeding_source_report.component/breeding_source_report.ios.js';
import ShowImage from './breeding_source_report.component/show_image.ios.js';
import HotZoneInfo from './hot_zone_info/hot_zone_info.js';
import HospitalInfo from './hospital_info/hospital_info.js';
import Menu from './menu.ios.js';
export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this._enter = this._enter.bind(this);
        this._back = this._back.bind(this);
        this._toTop = this._toTop.bind(this);
        this._navigatorRenderScene = this._navigatorRenderScene.bind(this);
    }
    render() {
        return (
            <Navigator
                ref="nav"
                style={styles.container}
                initialRoute={{id: 'menu'}}
                renderScene={this._navigatorRenderScene}/>
        );
    }
    _enter(id,data) {
        this.refs.nav.push({id:id, data:data});
    }
    _back(){
        this.refs.nav.pop();
    }
    _toTop(){
        this.refs.nav.popToTop();
    }
    _navigatorRenderScene(route, navigator) {
        _navigator = navigator;
        switch (route.id) {
            case 'menu':
            return (<Menu  _enter={this._enter} _back={this._back} identity={this.props.identity}  />);
            case 'breedingSourceReport':
            return (<BreedingSourceReport _enter={this._enter} _back={this._back}  />);
            case 'showImage':
            return(<ShowImage _toTop={this._toTop} _enter={this._enter} _back={this._back} uri={route.data}></ShowImage>)
            case 'breedingSourceReportList':
            return (<BreedingSourceReportList _enter={this._enter} _back={this._back}  />);
            case 'eachBreedingSourceReport':
            return (<EachBreedingSourceReport _back={this._back} sourceId={route.data}  />);
            case 'hotZoneInfo':
            return (<HotZoneInfo _back={this._back} />);
            case 'hospitalInfo':
            return (<HospitalInfo _enter={this._enter} _back={this._back} />);

        }
    }
}
var styles = StyleSheet.create({
    texts: {
        color:'#000',
    },
    container: {

    },
})
