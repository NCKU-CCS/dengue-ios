import React, {
    View,
    Text,
    Component,
    Image,
    StyleSheet,
    MapView,
} from 'react-native';


import StatusBar from '../StatusBar.js';
import CONSTANTS from '../Global.js';
var CANCEL_INDEX = 4;
export default class BreedingSourceReportList extends Component {

    constructor(props) {
        super(props);
        let lng = parseFloat(props.source.lng),
            lat = parseFloat(props.source.lat);
        this.state = {
            mapRegion: {
                longitude: lng,
                latitude: lat,
                latitudeDelta:0.01,
                longitudeDelta:0.01,
            },
            annotations :[{
                longitude: lng,
                latitude: lat,
                title: props.source.name
            }]
        };
    }
    render() {
        return(

                <MapView
                    style={styles.map}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    region={this.state.mapRegion}
                    annotations={this.state.annotations}
                />

        )
    }

}
BreedingSourceReportList.defaultProps = {
}
var styles = StyleSheet.create({
    map: {
        flex:1,
        width:CONSTANTS.screenWidth,
    },

})
