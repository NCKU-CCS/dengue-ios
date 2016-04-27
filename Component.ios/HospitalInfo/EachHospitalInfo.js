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
    componentWillReceiveProps(nextProps) {
        let annotations = [{
            longitude: nextProps.source.lng,
            latitude: nextProps.source.lat,
            title: nextProps.source.name
        }],
        mapRegion = {
            longitude: nextProps.source.lng,
            latitude: nextProps.source.lat,
            latitudeDelta:0.01,
            longitudeDelta:0.01,
        };
        this.setState({
            annotations: annotations,
            mapRegion: mapRegion,
        });
    }
    render() {
        console.log(this.state.annotations);
        return(

                <MapView
                    style={styles.map}
                    onAnnotationPress={()=>{}}
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
