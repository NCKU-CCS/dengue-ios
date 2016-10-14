import React, {
  Component,
  Animated,
  View,
  Text,
} from 'react-native';

import CONSTANTS from '../Global.js';
import { connect } from 'react-redux';
class PopImageBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(CONSTANTS.screenHeight),
      opacity: new Animated.Value(0),
      imageIndex: 0,
    };
  }
  componentDidUpdate() {
    const { popImage } = this.props;
    if(popImage) {
       this.state.top.setValue(500);
          Animated.timing(
            this.state.top,
            {
              toValue: 0,
              duration: 300,
            }
          ).start(() => {
            Animated.timing(this.state.opacity, {
              toValue: 0.5,
              duration: 300,
            }).start()
          });
    }
    else {
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration:300
      });
    Animated.timing(
      this.state.top,
      {
        toValue: CONSTANTS.screenHeight,
        duration: 300,
      }
    ).start();

    }
  }
  render() {
    const { imageIndex, top, opacity } = this.state,
    { popImage } = this.props;
    return (
      <Animated.View
        style = {{
          width: CONSTANTS.screenWidth,
          height: CONSTANTS.screenHeihgt,
          position: 'absolute',
          backgroundColor: '#000',
          top,
          opacity,
        }}
      >
        <View
          style = {{
            width: CONSTANTS.screenWidth,
            height: CONSTANTS.screenHeihgt,
          }}
        >

        </View>
      </Animated.View>
    )
  }
}

function select(state) {
  return {
  popImage: state.popImage,
  }

}

export default connect(select)(PopImageBackground);
