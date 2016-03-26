import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Dimensions,
} from 'react-native';
import StatusBar from '../status_bar.ios.js';
import Camera from 'react-native-camera';
import ShowImage from './show_image.ios.js';
import CONSTANTS from '../constants.ios.js';
export default class Second extends Component {

    constructor(props) {
        super(props);
        this.state={};

    }
    render() {

            return (
                <View style={styles.container}>
                    <StatusBar title="孳生源舉報" _back={this.props._back}></StatusBar>
                    <Camera
                        ref="cam"
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}
                        captureTarget={Camera.constants.CaptureTarget.disk}
                        >
                        <Text style={styles.capture} onPress={this._takePicture.bind(this)}>[CAPTURE]</Text>
                    </Camera>
                </View>
            )


    }
    _takePicture() {
        this.refs.cam.capture([])
        .then((data) => this.props._enter("showImage", data) )
        .catch(err => console.error(err));
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: CONSTANTS.screenHeight * 0.5,
        width: CONSTANTS.screenHeight * 0.9
    },

    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        marginBottom: 80,
    },


});
