import React, {
    View,
    Text,
    Component,
    Image,
    StyleSheet,
} from 'react-native';

import MapView from 'react-native-maps';
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
            marker :{
                coordinate:{
                    longitude: lng,
                    latitude: lat,
                },
                title: props.source.name,
            }
        };
    }
    componentWillReceiveProps(nextProps) {
        let marker = {
            coordinate: {
                longitude: nextProps.source.lng,
                latitude: nextProps.source.lat,
            },
            title: nextProps.source.name
        },
        mapRegion = {
            longitude: nextProps.source.lng,
            latitude: nextProps.source.lat,
            latitudeDelta:0.01,
            longitudeDelta:0.01,
        };
        this.setState({
            marker: marker,
            mapRegion: mapRegion,
        });
    }
    render() {
        const {marker} = this.state;
        return(

            <MapView
                style={styles.map}
                showsUserLocation = {true}
                region={this.state.mapRegion}
                >
                <MapView.Marker
                    coordinate={marker.coordinate}
                    title={marker.title}
                    description={marker.description}
                    />
            </MapView>

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
