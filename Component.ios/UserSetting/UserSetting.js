import React, {
  Component
} from 'react-native';
import InfoView from './InfoView.js';
import SignupView from './SignupView.js';
import {connect} from 'react-redux';
class UserSetting extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    /* eslint-disable camelcase */
    const {enter, login, toTop} = this.props;
    if(!login.quick) {
      return null;// if logined no this page
      return (
        <InfoView
          score = {score}
          bites_count = {bites_count}
          breeding_source_count = {breeding_source_count}
        />
      );
    }
    /* eslint-enable camelcase */
    return (
      <SignupView
        enter = {enter}
        toTop={toTop}
      />
    );
  }
}
function select(state) {
  return {
    login: state.login
  };
}
export default connect(select)(UserSetting);
