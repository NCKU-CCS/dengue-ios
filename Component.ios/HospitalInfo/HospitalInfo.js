import React, {
    View,
    Text,
    Component,
    TouchableHighlight,
    StyleSheet,
    Image,
    ListView,
} from 'react-native';
import CONSTANTS from '../Global.js';
import StatusBar from '../StatusBar.js';
import EachSource from './EachSource.js';
import Buttons from './Buttons.js';
const REQUEST_URL = 'http://140.116.247.113:11401/hospital/nearby/?database=tainan&lng=120.218206&lat=22.993109';
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
                        dataSource: responseData,
                        displaySource: this.state.displaySource.cloneWithRows(responseData),
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
