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
        this.changeSource = this.changeSource.bind(this);
    }
    componentDidMount(){
        this.loadData(this.state.status);
        //this.fetchData(this.state.status);
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.status !== this.state.status){
            console.log(321);
            this.loadData(this.state.status);
            //this.fetchData(this.state.status);
        }
    }
    loadData(status) {
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
            let sourceNumber = responseData.length;
            CONSTANTS.storage.save({
                key: 'breedingSourceReport',  //注意:请不要在key中使用_下划线符号!
                id: status,
                rawData: responseData,

                //如果不指定过期时间，则会使用defaultExpires参数
                //如果设为null，则永不过期
                expires:  1000 * 3600 * 24
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                loaded: true,
                sourceNumber: sourceNumber,
            });
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
            console.warn(err);
        })
    }
    changeSource(status){
        if(status !== this.state.status){
            this.setState({
                loaded: false,
                status: status,
            });
        }
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
