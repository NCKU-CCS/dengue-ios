import React, {
    View,
    Text,
    Component,
    TouchableHighlight,
    StyleSheet,
    ListView,
    AlertIOS,
    Image,
} from 'react-native';
import CONSTANTS from '../Global.js';
import StatusBar from '../StatusBar.js';
import BreedingListView from './BreedingListView.js';
export default class BreedingSourceReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            sourceNumber:0,
            status: '未處理',
        };
        this.renderListView = this.renderListView.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.changeSource = this.changeSource.bind(this);
    }
    componentDidMount(){
        this.fetchData(this.state.status);
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.status !== this.state.status){
            this.fetchData(this.state.status);
        }
    }
    fetchData(status) {
        console.log(123);
        status = status === '已處理' ? status + ',非孳生源': status;
        fetch(`http://140.116.247.113:11401/breeding_source/get/?database=tainan&status=${status}`)
        .then((response) => {
            if(!response.ok){
                throw Error(response.status);
            }
            return response.json()
        })
        .then((responseData) => {
            let sourceNumber = responseData.length;
            CONSTANTS.storage.save({
                key: 'breedingSourceReport',  //注意:请不要在key中使用_下划线符号!
                rawData: responseData,

                //如果不指定过期时间，则会使用defaultExpires参数
                //如果设为null，则永不过期
                expires:  null
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                loaded: true,
                sourceNumber: sourceNumber,
            });
        })
        .catch((error) => {
            alert('出了點問題！');
        })
        .done();
    }
    changeSource(obj){
        this.setState(obj);
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return this.renderListView();

    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading sources...
                </Text>
            </View>
        );
    }
    renderListView() {
        let {
            dataSource,
            status,
            sourceNumber
        } = this.state;
        //return null;
        return(
            <BreedingListView
                dataSource = {dataSource}
                sourceNumber = {sourceNumber}
                status = {status}
                changeSource = {this.changeSource}
                fetchData = {this.fetchData}
            />
        );
    }

}
const styles = StyleSheet.create({
    container:{
        backgroundColor: CONSTANTS.backgroundColor,
        flex:1,
    }
});
