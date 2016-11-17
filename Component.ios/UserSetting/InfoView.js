import React, {
  Component, View, Text, ScrollView,
  StyleSheet, Image
} from 'react-native';
import CONSTANTS from '../Global.js';
import {connect} from 'react-redux';
import {requestLogout} from '../../Actions.ios/index.js';
import Button from '../Common/Button.js';
import FBLink from '../Common/FBLink.js';
import WebLink from '../Common/WebLink.js';
class InfoView extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }
  signout() {
    const {dispatch} = this.props;
    dispatch(requestLogout());
  }
  render() {
    const {
      score,
      breeding_source_count, // eslint-disable-line camelcase
      bites_count, // eslint-disable-line camelcase
    } = this.props;
    /* eslint-disable camelcase */
    return (
      <ScrollView>
        <Image
          source = {require('../../img/people.png')}
          style = {styles.image}>
        </Image>
        <View style = {styles.texts}>
          <Text style = {styles.text}>
            積分：{score}
          </Text>
          <Text style = {styles.text}>
            舉報滋生源：{breeding_source_count}
          </Text>
          <Text style = {styles.text}>
            舉報蚊子叮咬：{bites_count}
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button onPress={this.signout}
            buttonText="登出"
          />
          <FBLink />
          <WebLink />
        </View>
      </ScrollView>
    );
    /* eslint-enable camelcase */
  }
}
export default connect()(InfoView);
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: CONSTANTS.backgroundColor,
    flex: 1,
    paddingTop: 30,
  },
  image: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 30,
  },
  texts: {
    alignSelf: 'center',
    marginTop: 15,
  },
  text: {
    fontSize: 25,
    marginTop: 15,
  },
  buttons: {
    marginTop: 15,
  },
  button: {
    marginTop: 30,
    paddingVertical: 8,
    paddingHorizontal: 25,
    backgroundColor: CONSTANTS.backgroundColor,
    borderRadius: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
