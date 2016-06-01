import React, {
    View,
    Text,
    Component,
    TouchableHighlight,
    StyleSheet,
    Image,
    ListView,
    ActivityIndicatorIOS,
} from 'react-native';
import CONSTANTS from '../Global.js';
import StatusBar from '../StatusBar.js';
import EachSource from './EachSource.js';
import Buttons from './Buttons.js';

export default class BreedingSourceReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            displaySource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            type: '全部',
            loaded: false,
            sourceNumber: 0
        };
        this.changeType = this.changeType.bind(this);
        this.renderEachSource = this.renderEachSource.bind(this);
        this.enterCheckPage = this.enterCheckPage.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    componentDidMount(){
        this.loadData();
    }
    updateState(responseData) {
        const sourceNumber = responseData.length;
        this.setState({
            dataSource: responseData,
            displaySource: this.state.displaySource.cloneWithRows(responseData),
            sourceNumber: sourceNumber,
            loaded: true,
        });
    }
    loadData() {
        CONSTANTS.storage.load({
            key: 'hospitalInfo',
            autoSync: true,
            syncInBackground: true
        }).then(responseData => {
            //如果找到数据，则在then方法中返回
            this.updateState(responseData);
            CONSTANTS.storage.save({
                key: 'hospitalInfo',  //注意:请不要在key中使用_下划线符号!
                rawData: responseData,

                //如果不指定过期时间，则会使用defaultExpires参数
                //如果设为null，则永不过期
                expires:  1000 * 3600
            });

        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
            console.warn(err);
        });
    }
    fetchData() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                fetch(`http://140.116.247.113:11401/hospital/nearby/?database=tainan&lng=${lon}&lat=${lat}`)
                .then((response) => {
                    if(!response.ok){
                        throw Error(response.statusText)
                    }
                    return response.json();
                })
                .then((responseData) => {
                    this.updateState(responseData);
                })
                .catch((error) => {
                    console.warn(error);
                })
                .done();
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

    }
    changeType(newType) {
        let displaySource = [];
        if(newType === '全部'){
            displaySource = [...this.state.dataSource];
        }
        else{
            displaySource = this.state.dataSource.filter((d) => {
                if(d.name.indexOf(newType) !== -1){
                    return d;
                }
            });
        }
        this.setState({
            displaySource: this.state.displaySource.cloneWithRows(displaySource),
            type: newType,
            sourceNumber: displaySource.length,
        })
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
                <ActivityIndicatorIOS
                    animating={true}
                    style={{height: 80}}
                    size="large"
                    />
            </View>
        );
    }
    renderListView() {
        return(
            <View style={styles.container}>
                <Text style={styles.topText}>
                    {`您附近有  `}
                    <Text style={styles.sourceNumber}>
                        {this.state.sourceNumber}
                    </Text>
                    {`  間醫療診所`}

                </Text>
                <Buttons
                    changeType = {this.changeType}
                    type = {this.state.type}

                    />
                <ListView
                    dataSource={this.state.displaySource}
                    renderRow={this.renderEachSource}
                    style={styles.listView}
                    />
            </View>
        )

    }
    renderEachSource(source) {
        return(
            <EachSource
                source = {source}
                enterCheckPage = {this.enterCheckPage}
                />
        );
    }
    enterCheckPage(source){
        this.props.enter("eachHospitalInfo",'就醫資訊',source);
    }
}
var styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTANTS.backgroundColor,
        flex:1,
        paddingTop:30,
        justifyContent:'center',
    },
    topText: {
        alignSelf:'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    sourceNumber: {
        color: CONSTANTS.mainColor,
    },

})
