import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import StatusBar from '../StatusBar.js';
import Camera from 'react-native-camera';
import ShowImage from './ShowImage.js';
import CONSTANTS from '../Global.js';
import ImageResizer from 'react-native-image-resizer';
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
                        captureAudio={false}
                >
                        <View style = {styles.bottomBar}>
                            <TouchableHighlight onPress={this.takePicture} style={styles.capture} >
                                <View style={styles.capture}></View>
                            </TouchableHighlight>
                        </View>
                </Camera>
            )


    }
    takePicture() {
        this.refs.cam.capture([])
        .then((data) => {
            return ImageResizer.createResizedImage(data.path, 150, 120, 'JPEG', 50)

        })
        .then((uri) => {
            this.props.enter("showImage", '孳生源舉報', uri);
        })
        .catch(err => console.error(err));
    }
}

var styles = StyleSheet.create({
    preview: {
        paddingTop: 50,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //height: CONSTANTS.screenHeight * 0.5,
        //width: CONSTANTS.screenwidth,
        //paddingBottom:100,
    },
    bottonBar: {
        width: CONSTANTS.screenwidth,
        height:60,
        backgroundColor: '#aaa',
    },
    capture: {
        backgroundColor: '#fff',
        borderRadius: 30,
        alignItems: 'center',
        height:60,
        width:60,
        marginBottom: 50,
    },


});
