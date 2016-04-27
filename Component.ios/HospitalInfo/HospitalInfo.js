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
const REQUEST_URL = 'http://140.116.247.113:11401/hospital/nearby/?database=tainan&lng=120.218206&lat=22.993109';
export default class BreedingSourceReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                }),
            loaded: false,
            sourceNumber: 0
        };
        this.renderEachSource = this.renderEachSource.bind(this)
    }
    componentDidMount(){
        this.fetchData();
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
                    let sourceNumber = responseData.length;
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(responseData),
                        sourceNumber: sourceNumber,
                        loaded: true,
                    });
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
                <Text style={styles.topText}>
                    {`您附近有  `}
                    <Text style={styles.sourceNumber}>
                        {this.state.sourceNumber}
                    </Text>
                    {`  間醫療診所`}
                </Text>
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
            <TouchableHighlight
                onPress={() => this.enterCheckPage(source)}
                underlayColor = {CONSTANTS.backgroundColor}
                activeOpacity = {0.5}
            >
                <View style={styles.eachList}>
                    <View style={styles.name}>
                        <Text style={styles.nameText}>{source.name}</Text>
                    </View>
                    <View style={styles.address}>
                        <Text>{source.address}</Text>
                    </View>
                    <View style={styles.phone}>
                        <Text>{source.phone}</Text>
                    </View>
                </View>
            </TouchableHighlight>
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
    },
    topText: {
        alignSelf:'center',
        marginBottom: 30,
        fontSize: 18,
    },
    sourceNumber: {
        color: CONSTANTS.mainColor,
    },
    name: {
        flex:2,
        justifyContent:'center',
        marginBottom: 10,
    },
    nameText: {
        fontWeight:'bold',
        fontSize: 18,
        lineHeight:20,
    },
    address: {
        flex:1,
        justifyContent:'center',
    },
    phone: {
        flex:1,
        justifyContent:'center',
    },
    eachList: {
        backgroundColor: "#fff",
        flexDirection: 'column',
        height:130,
        padding:10,
        marginVertical:10,
        marginHorizontal:40,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
    },
})
