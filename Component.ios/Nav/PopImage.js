import React, {
  Component,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import CONSTANTS from '../Global.js';
import { connect } from 'react-redux';
import { dropImage } from '../../Actions.ios/index.js';
class PopImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(CONSTANTS.screenHeight),
      imageIndex: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.popImage && !this.props.popImage){
      console.log(123);
      this.setState({imageIndex: Math.floor(Math.random()*3)});
    }
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
          ).start();
    }
    else {
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
    const arr = [
      require('../../img/popImage1.png'),
      require('../../img/popImage2.png'),
      require('../../img/popImage3.png'),
    ],
    { imageIndex, top } = this.state,
    { dispatch, back, id } = this.props;
    return (
          <Animated.View
            style = {{
              width: CONSTANTS.screenWidth,
              height: CONSTANTS.screenHeihgt,
              position: 'absolute',
              top: top
            }}>
          <TouchableWithoutFeedback
          onPress={() => {
            dispatch(dropImage())
            if(id === 'showImage') back();
          }}
            style = {{
            }}
            >
            <Image
            source = {arr[imageIndex]}
            style = {{
              width: CONSTANTS.screenWidth - 100,
              height: CONSTANTS.screenHeight,
              opacity:1,
              marginLeft: 50,
              resizeMode: 'contain',
            }}
            >
            </Image>
            </TouchableWithoutFeedback>
          </Animated.View>
    )
  }
}

function select(state) {
  return {
  popImage: state.popImage,
  }

}

export default connect(select)(PopImage);
