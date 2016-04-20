import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Dimensions,
} from 'react-native';
import StatusBar from '../StatusBar.js';
import Camera from 'react-native-camera';
import ShowImage from './ShowImage.js';
import CONSTANTS from '../Global.js';
export default class Second extends Component {

    constructor(props) {
        super(props);
        this.state={};
        this.takePicture = this.takePicture.bind(this);
    }
    render() {

            return (
                <Camera
                        ref="cam"
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}
                        captureTarget={Camera.constants.CaptureTarget.disk}
                        >
                        <Text style={styles.capture} onPress={this.takePicture}>[CAPTURE]</Text>
                </Camera>
            )


    }
    takePicture() {
        this.refs.cam.capture([])
        .then((data) => this.props.enter("showImage", data))
        .catch(err => console.error(err));
    }
}

var styles = StyleSheet.create({
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
