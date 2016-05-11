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
        this.renderEachSource = this.renderEachSource.bind(this);
        this.renderLoadingView = this.renderLoadingView.bind(this);
        this.renderListView = this.renderListView.bind(this);
        this.statusFocus = this.statusFocus.bind(this);
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
        status = status === '已處理' ? status + ',非滋生源': status; 
        fetch(`http://140.116.247.113:11401/breeding_source/get/?database=tainan&status=${status}`)
        .then((response) => {
            if(!response.ok){
                throw Error(response.status);
            }
            return response.json()
        })
        .then((responseData) => {
            var sourceNumber = responseData.length;
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
            console.warn(error);
            alert('出了點問題！');
        })
        .done();
    }
    updateStatus(source, status){
        let formData = new FormData();
        formData.append('database','tainan');
        formData.append('source_id', source.source_id);
        formData.append('status', status);
        fetch('http://140.116.247.113:11401/breeding_source/update/', {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        .then((response) => {
            if(!response.ok){
                throw Error(response.status);
            }
            this.fetchData(this.state.status);
            return response.text();
        })
        .then((response) => {
            alert('更新完成！');
        })
        .catch( err => {
            alert('更新失敗！');
            console.warn(err);
        })
    }
    statusFocus(status) {
        if(this.state.status === status){
            return styles.statusFocus;
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

        return(
            <View style={styles.container}>
                <View style={styles.status}>
                    <Text style={styles.topText}>
                        {`共有  `}
                        <Text style={styles.sourceNumber}>
                            {this.state.sourceNumber}
                        </Text>
                        {`  點${this.state.status}`}
                    </Text>
                    <View style = {styles.statusButtons}>
                        <TouchableHighlight
                            style = {[styles.statusButton, this.statusFocus('未處理')]}
                            onPress = {() => {this.setState({loaded:false, status:'未處理'});}}
                        >
                            <Text style={styles.statusText}>
                                未處理
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style = {[styles.statusButton, styles.center, this.statusFocus('通報處理')]}
                            onPress = {() => {this.setState({loaded:false, status:'通報處理'});}}
                        >
                            <Text style={styles.statusText}>
                                待處理
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style = {[styles.statusButton, this.statusFocus('已處理')]}
                            onPress = {() => {this.setState({loaded:false, status:'已處理'});}}
                        >
                            <Text style={styles.statusText}>
                                已處理
                            </Text>
                        </TouchableHighlight>
                    </View>
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
                            {source.created_at.match(/(.+)\./)[1]}
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
                        onPress={this.updateStatus.bind(this,source,'已處理')}
                        >
                        <Text style={styles.text}>
                            已處理
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.updateStatus.bind(this,source,'通報處理')}
                        >
                        <Text style={styles.text}>
                            通報處理
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.updateStatus.bind(this,source,'非孳生源')}
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
        flexDirection: 'column',
    },
    statusButtons: {
        marginTop:10,
        flexDirection:'row',
        borderWidth: 1,
        borderColor:'#ccc',
        borderRadius:3,

    },
    statusButton: {
        flex:1,
        padding:5,
    },
    center: {
        borderLeftWidth: 1,
        borderRightWidth:1,
        borderColor:'#ccc',
    },
    statusFocus: {
        backgroundColor: '#ccc',
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
        position:'absolute'
    },
    description: {
        marginTop:70,


    },
    createdTime: {
        position:'absolute',
        marginBottom:10,
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
