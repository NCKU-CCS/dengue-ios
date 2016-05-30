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
export default class ContextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        if(this.props.info.identity === '里長'){
            this.loadBreedingSourceData('未處理');
            this.loadBreedingSourceData('通報處理');
            this.loadBreedingSourceData('已處理');
        }
    }
    loadBreedingSourceData(status) {
        status = status === '已處理' ? status + ',非孳生源': status;
        CONSTANTS.storage.load({
            key: 'breedingSourceReport',
            id: status,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(responseData => {
            //如果找到数据，则在then方法中返回
            CONSTANTS.storage.save({
                key: 'breedingSourceReport',  //注意:请不要在key中使用_下划线符号!
                id: status,
                rawData: responseData,
                expires: 1000 * 3600 * 24,

                //如果不指定过期时间，则会使用defaultExpires参数
                //如果设为null，则永不过期
            });

        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
            console.warn(err);
        });
    }
    render() {
        let {enter, back, toTop, data, id, restart, logined, info} = this.props;
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
            return (<HotZoneInfo back={back} />);
            case 'hospitalInfo':
            return (<HospitalInfo enter={enter} back={back} />);
            case 'eachHospitalInfo':
            return (<EachHospitalInfo enter={enter} back={back} source={data}/>);
            case 'mosquitoBiteReport':
            return (<MosquitoBiteReport enter={enter} back={back} toTop={toTop} />);
            case 'userSetting':
            return (<UserSetting restart = {restart} enter={enter} back={back}
                toTop={toTop}
                logined = {logined}
                info = {info}
                />);
            case 'signinView':
            return (<SigninView restart = {restart} toTop = {toTop}/>);
        }
    }
}
