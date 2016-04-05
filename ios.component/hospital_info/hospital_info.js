import React, {
    View,
    Text,
    Component,
    TouchableHighlight,
    StyleSheet,
    ListView,
} from 'react-native';
import CONSTANTS from '../constants.ios.js';
import StatusBar from '../status_bar.ios.js';
var REQUEST_URL = 'http://localhost:1337/hospital_info/';
export default class BreedingSourceReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    }
    componentDidMount(){
        this._fetchData();
    }
    _fetchData() {
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            var sourceNumber = responseData.sources.length;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.sources),
                loaded: true,
            });
        })
        .catch((error) => {
            console.warn(error);
        })
        .done();
    }
    render() {
        if (!this.state.loaded) {
            return this._renderLoadingView();
        }
        return this._renderListView();

    }

    _renderLoadingView() {
        return (
            <View style={styles.container}>
                <StatusBar title="附近醫院資訊" _back={this.props._back}></StatusBar>
                <Text>
                    Loading sources...
                </Text>
            </View>
        );
    }
    _renderListView() {
        return(
            <View style={styles.container}>
                <StatusBar title="附近醫院資訊" _back={this.props._back}></StatusBar>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderEachSource.bind(this)}
                    style={styles.listView}
                    />
            </View>
        )

    }
    _renderEachSource(source) {
        return(
            <TouchableHighlight  onPress={this._enterCheckPage.bind(this,source.id)}>
                <View style={styles.eachList}>
                    <View style={styles.hospitalName}>
                        <Text>{source.hospitalName}</Text>
                    </View>
                    {//<View style=styles.hospitalAddress}>
                        //<Text>source.hospitalAddress}</Text>
                    //</View>
                    }
                    <View style={styles.go}>
                        <Text style={styles.goText}>前往查看</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    _enterCheckPage(sourceId){
        this.props._enter("eachHospitalInfo",sourceId);
    }
}
var styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTANTS.backgroundColor,
        flex:1,
    },

    go: {
        width:80,
        justifyContent:'center',
    },
    goText: {
        color: CONSTANTS.mainColor,
    },
    hospitalAddress: {
        flex:2,
        justifyContent:'center',
        paddingLeft: 10,
    },
    hospitalName: {
        flex:1,
        justifyContent:'center',
        paddingLeft: 10,
    },
    eachList: {
        backgroundColor: CONSTANTS.backgroundColor,
        flexDirection: 'row',
        height:40,
        marginVertical:2,
    },
})
