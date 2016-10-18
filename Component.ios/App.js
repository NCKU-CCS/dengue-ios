/**
* Dengueapp
*
*/

import React, {
    Component
} from 'react-native';

import { connect } from 'react-redux';
import Nav from './Nav.js';
import CONSTANTS from './Global.js';
import Intro from './Intro/Intro.js';
import { requestQuickLogin, storageLoadLogin, requestGps } from '../Actions.ios/index.js';
class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      this.props.dispatch(storageLoadLogin());
      this.props.dispatch(requestGps());
      //this.getLoginState();
    }
    render() {
        const {swiper} = this.props.login;
        if(swiper === -1){
            return <Nav />;
        }
        else if(swiper === 1){
            return <Intro />;
        }
        else{
            return null;
        }
    }
}

function select(state) {
  return {
    login: state.login,
  }
}
export default connect(select)(App)
