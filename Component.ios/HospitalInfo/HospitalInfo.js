import React, {
    View,
    Text,
    Component,
    TouchableHighlight,
    StyleSheet,
    ListView,
} from 'react-native';
import CONSTANTS from '../Global.js';
import StatusBar from '../StatusBar.js';
var REQUEST_URL = 'http://140.116.247.113:11401/hospital/nearby/?database=tainan&lng=120.218206&lat=22.993109';
export default class BreedingSourceReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
        this.renderEachSource = this.renderEachSource.bind(this)
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData() {
        fetch(REQUEST_URL)
        .then((response) => { console.log(response); return response.json();})
        .then((responseData) => {
            var sourceNumber = responseData.length;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
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
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderEachSource}
                    style={styles.listView}
                    />
            </View>
        )

    }
    renderEachSource(source) {
        return(
            <TouchableHighlight  onPress={() => this.enterCheckPage(source)}>
                <View style={styles.eachList}>
                    <View style={styles.hospitalName}>
                        <Text>{source.name}</Text>
                    </View>
                    {
                    //<View style=styles.hospitalAddress}>
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
    enterCheckPage(source){
        this.props.enter("eachHospitalInfo",source);
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
