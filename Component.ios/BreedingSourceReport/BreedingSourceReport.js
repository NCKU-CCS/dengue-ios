// 處理拍照
import React, {
  Component,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';
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
          <View style = {styles.buttomBar}>
            <TouchableOpacity

              onPress={this.takePicture}
              style={styles.capture}
              >
                <View style={styles.inside}>

                </View>
              </TouchableOpacity>
            </View>
          </Camera>
    );
  }
  takePicture() {
    this.refs.cam.capture([])
      .then((data) => {
        return ImageResizer.createResizedImage(data.path, 400, 300, 'JPEG', 70);
        // return data.path;
      })
      .then((uri) => {
        this.props.enter('showImage', '環境回報', uri);
      })
      .catch(err => console.log(err));
  }
}

let styles = StyleSheet.create({
  preview: {
    paddingTop: 50,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    //height: CONSTANTS.screenHeight * 0.5,
    //width: CONSTANTS.screenwidth,
    //paddingBottom:100,
  },
  buttomBar: {
    width: CONSTANTS.screenWidth,
    height: 60,
    backgroundColor: 'rgba(250,250,250,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
  inside: {
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    height: 40,
    width: 40,
    borderColor: '#333',
    borderWidth: 2,
  }


});
