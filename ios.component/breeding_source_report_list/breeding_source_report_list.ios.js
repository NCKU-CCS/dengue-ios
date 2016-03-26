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
var REQUEST_URL = 'http://localhost:1337/breeding_source_list/';
export default class BreedingSourceReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            sourceNumber:0,
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
                sourceNumber: sourceNumber,
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
                <StatusBar title="待檢查孳生源點" _back={this.props._back}></StatusBar>
                <Text>
                    Loading sources...
                </Text>
            </View>
        );
    }
    _renderListView() {
        return(
            <View style={styles.container}>
                <StatusBar title="待檢查孳生源點" _back={this.props._back}></StatusBar>
                <View style={styles.status}>
                    <Text>
                        有{this.state.sourceNumber}點待查
                    </Text>
                </View>
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
                    <View style={styles.address}>
                        <Text>{source.address}</Text>
                    </View>
                    <View style={styles.go}>
                        <Text style={styles.goText}>前往查看</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    _enterCheckPage(sourceId){
        this.props._enter("eachBreedingSourceReport",sourceId);
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
    address: {
        flex:1,
        justifyContent:'center',
        paddingLeft: 10,
    },
    status:{
        marginVertical: 30,
        alignItems:'center',
    },
    listView: {

    },
    eachList: {
        backgroundColor: CONSTANTS.backgroundColor,
        flexDirection: 'row',
        height:40,
        marginVertical:2,
    },
})
