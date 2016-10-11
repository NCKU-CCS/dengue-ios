/**
* Dengueapp
*
*/

import React, {
    AppRegistry,
    Component
} from 'react-native';

import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './Reducers.ios/index.js';


import App from './Component.ios/App.js';

const loggerMiddleware = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);
export default class Root extends Component {
  render() {
    return (
      <Provider store = {store}>
        <App />
      </Provider>
    );
  }
}




AppRegistry.registerComponent('DengueFever', () => Root);
