import React, {
    Component
} from 'react-native';
import InfoView from './InfoView.js';
import SignupView from './SignupView.js';
import CONSTANTS from '../Global.js';
import { connect } from 'react-redux';
class UserSetting extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {enter, login, toTop} = this.props;
      if(!login.quick){
        return null;// if logined no this page
            return (
                <InfoView
                    score = {score}
                    bites_count = {bites_count}
                    breeding_source_count = {breeding_source_count}
                />
            );
        }
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
  }
}
export default connect(select)(UserSetting);
