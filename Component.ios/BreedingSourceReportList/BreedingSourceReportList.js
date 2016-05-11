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
var REQUEST_URL = 'http://140.116.247.113:11401/breeding_source/get/?database=tainan&status=未處理';
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
        this.renderEachSource = this.renderEachSource.bind(this);
        this.renderLoadingView = this.renderLoadingView.bind(this);
        this.renderListView = this.renderListView.bind(this);
        this.done = this.done.bind(this);
        this.called = this.called.bind(this);
        this.not = this.not.bind(this);
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData() {
        fetch(REQUEST_URL)
        .then((response) => {
            if(!response.ok){
                throw Error(response.status);
            }
            return response.json()
        })
        .then((responseData) => {
            console.log(responseData);
            var sourceNumber = responseData.length;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                loaded: true,
                sourceNumber: sourceNumber,
            });
        })
        .catch((error) => {
            console.warn(error);
            alert('出了點問題！');
        })
        .done();
    }
    done(source) {
        fetch('http://140.116.247.113:11401/breeding_source/update/', {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify({
                "database": "tainan",
                "source_id": source.source_id,
                "status": "通報處理"
            })
        })
        .then((response) => {
            if(!response.ok){
                throw Error(response.status);
            }
            return response.text();
        })
        .then((response) => {
            alert('已通報處理！');
        })
        .catch( err => {
            alert('改變失敗！');
            console.warn(err);
        })
    }
    called(source) {

    }
    not(source) {

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
                <View style={styles.status}>
                    <Text style={styles.topText}>
                        {`尚有  `}
                        <Text style={styles.sourceNumber}>
                            {this.state.sourceNumber}
                        </Text>
                        {`  點待查`}
                    </Text>
                </View>
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
            <View style={styles.eachList}>
                <View style={styles.source}>
                    <View style={styles.leftSide}>
                        <Text style={styles.title}>
                            {source.lat}
                        </Text>
                        <Text style={styles.description}>
                            {source.description}
                        </Text>
                        <Text style={styles.createdTime}>
                            {source.created_at}
                        </Text>
                    </View>
                    <Image
                        style = {styles.rightSide}
                        source = {{uri: source.photo_url}}
                        >
                    </Image>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.done.bind(this,source)}
                        >
                        <Text style={styles.text}>
                            已處理
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.called.bind(this,source)}
                        >
                        <Text style={styles.text}>
                            通報處理
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.not.bind(this,source)}
                        >
                        <Text style={styles.text}>
                            非孳生源
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTANTS.backgroundColor,
        flex:1,
    },

    status:{
        marginVertical: 30,
        alignItems:'center',
    },
    topText: {
        alignSelf:'center',
        fontSize: 18,
    },
    sourceNumber: {
        color: CONSTANTS.mainColor,
    },
    listView: {

    },
    eachList: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        height:240,
        marginVertical:2,
        borderWidth:1,
        borderColor:'#ddd',
    },
    source: {
        flex:1,
        flexDirection: 'row',
    },
    leftSide: {
        flex: 0.6,
        paddingLeft: 10,
    },
    title: {
        fontSize:30,
        fontWeight:'bold',
        marginTop:10,
    },
    description: {
        marginVertical:50,
    },
    rightSide: {
        flex: 0.4,
        resizeMode: 'contain',
    },
    buttons: {
        height:40,
        flexDirection: 'row'
    },
    button: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#ddd',
    },
    text: {
        color: '#aaa'
    },

})
