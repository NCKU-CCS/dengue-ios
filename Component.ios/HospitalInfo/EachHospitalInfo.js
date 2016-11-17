// 地圖顯示醫院
import React, {
  Component,
  StyleSheet
} from 'react-native';

import MapView from 'react-native-maps';
import CONSTANTS from '../Global.js';
export default class BreedingSourceReportList extends Component {
  constructor(props) {
    super(props);
    const lng = parseFloat(props.source.lng);
    const lat = parseFloat(props.source.lat);
    this.state = {
      mapRegion: {
        longitude: lng,
        latitude: lat,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      marker: {
        coordinate: {
          longitude: lng,
          latitude: lat,
        },
        title: props.source.name,
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    const marker = {
      coordinate: {
        longitude: nextProps.source.lng,
        latitude: nextProps.source.lat,
      },
      title: nextProps.source.name
    };
    const mapRegion = {
      longitude: nextProps.source.lng,
      latitude: nextProps.source.lat,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
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
        region={this.state.mapRegion}>
        <MapView.Marker
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        />
      </MapView>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: CONSTANTS.screenWidth,
  },
});
