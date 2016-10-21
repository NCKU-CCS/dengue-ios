import React,{
    Component
} from 'react-native';
import EachBreedingSourceReport from '../BreedingSourceReportList/EachBreedingSourceReport.js';
import BreedingSourceReportList from '../BreedingSourceReportList/BreedingSourceReportList.js';
import BreedingSourceReport from '../BreedingSourceReport/BreedingSourceReport.js';
import ShowImage from '../BreedingSourceReport/ShowImage.js';
import MosquitoBiteReport from '../MosquitoBiteReport/MosquitoBiteReport.js';
import HotZoneInfo from '../HotZoneInfo/HotZoneInfo.js';
import HospitalInfo from '../HospitalInfo/HospitalInfo.js';
import EachHospitalInfo from '../HospitalInfo/EachHospitalInfo.js';
import UserSetting from '../UserSetting/UserSetting.js';
import SigninView from '../UserSetting/SigninView.js';
import CONSTANTS from '../Global.js';
import { requestGps } from '../../Actions.ios';
import { connect } from 'react-redux';
class ContextComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.id !== this.props.id) {
        this.props.dispatch(requestGps());
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.id !== this.props.id &&
        nextProps.data !== this.props.data;
    }
    render() {
      const {enter, back, toTop, route} = this.props;
      const {id, data} = route;
        switch (id) {
            case 'breedingSourceReport':
            return (<BreedingSourceReport enter={enter} back={back}  />);
            case 'showImage':
            return (<ShowImage toTop={toTop} enter={enter} back={back} uri={data}></ShowImage>);
            case 'breedingSourceReportList':
            return (<BreedingSourceReportList enter={enter} back={back}  />);
            case 'eachBreedingSourceReport':
            return (<EachBreedingSourceReport back={back} source={data}  />);
            case 'hotZoneInfo':
            return (<HotZoneInfo back={back}/>);
            case 'hospitalInfo':
            return (<HospitalInfo enter={enter} back={back} />);
            case 'eachHospitalInfo':
            return (<EachHospitalInfo enter={enter} back={back} source={data}/>);
            case 'mosquitoBiteReport':
            return (<MosquitoBiteReport enter={enter} back={back} toTop={toTop} />);
            case 'userSetting':
            return (<UserSetting enter={enter} back={back}
                toTop={toTop}
                />);
                case 'signinView':
                return (<SigninView toTop = {toTop}/>);
            }
        }
}


function select(state) {
  return {

  }
}

export default connect(select)(ContextComponent);
