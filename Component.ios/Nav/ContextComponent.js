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

export default class ContextComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let props = this.props;
        switch (props.id) {
            case 'breedingSourceReport':
            return (<BreedingSourceReport enter={props.enter} back={props.back}  />);
            case 'showImage':
            return (<ShowImage toTop={props.toTop} enter={props.enter} back={props.back} uri={props.data}></ShowImage>);
            case 'breedingSourceReportList':
            return (<BreedingSourceReportList enter={props.enter} back={props.back}  />);
            case 'eachBreedingSourceReport':
            return (<EachBreedingSourceReport back={props.back} sourceId={props.data}  />);
            case 'hotZoneInfo':
            return (<HotZoneInfo back={props.back} />);
            case 'hospitalInfo':
            return (<HospitalInfo enter={props.enter} back={props.back} />);
            case 'eachHospitalInfo':
            return (<EachHospitalInfo enter={props.enter} back={props.back} />);
            case 'mosquitoBiteReport':
            return (<MosquitoBiteReport enter={props.enter} back={props.back}  />);
        }
    }
}
