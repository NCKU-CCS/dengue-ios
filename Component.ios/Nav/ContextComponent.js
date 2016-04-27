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
        let {enter, back, toTop, data, id} = this.props;
        switch (id) {
            case 'breedingSourceReport':
            return (<BreedingSourceReport enter={enter} back={back}  />);
            case 'showImage':
            return (<ShowImage toTop={toTop} enter={enter} back={back} uri={data}></ShowImage>);
            case 'breedingSourceReportList':
            return (<BreedingSourceReportList enter={enter} back={back}  />);
            case 'eachBreedingSourceReport':
            return (<EachBreedingSourceReport back={back} sourceId={data}  />);
            case 'hotZoneInfo':
            return (<HotZoneInfo back={back} />);
            case 'hospitalInfo':
            return (<HospitalInfo enter={enter} back={back} />);
            case 'eachHospitalInfo':
            return (<EachHospitalInfo enter={enter} back={back} source={data}/>);
            case 'mosquitoBiteReport':
            return (<MosquitoBiteReport enter={enter} back={back} toTop={toTop} />);
        }
    }
}
