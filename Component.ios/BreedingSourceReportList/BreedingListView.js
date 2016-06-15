import React, {
    Component,
    View,
    TouchableHighlight,
    ListView,
    StyleSheet,
    Text,
    RefreshControl
} from 'react-native';
import CONSTANTS from '../Global.js';
import EachBreedingSourceReport from './EachBreedingSourceReport.js';
export default class BreedingListView extends Component {
    constructor(props) {
        super(props);
        this.renderEachSource = this.renderEachSource.bind(this);

    }
    statusFocus(status) {
        if(this.props.status === status){
            return styles.statusFocus;
        }
    }
    render() {
        const {
            changeSource,
            dataSource,
            sourceNumber,
            status,
            refreshing,
            onRefresh,
            onEndReached
        } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.status}>
                    <Text style={styles.topText}>
                        {`共有  `}
                        <Text style={styles.sourceNumber}>
                            {sourceNumber}
                        </Text>
                        {`  點${status}`}
                    </Text>
                    <View style = {styles.statusButtons}>
                        <TouchableHighlight
                            underlayColor = "#ccc"
                            style = {[styles.statusButton, this.statusFocus('未處理')]}
                            onPress = {() => {changeSource('未處理');}}
                            >
                            <Text style={styles.statusText}>
                                未處理
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor = "#ccc"
                            style = {[styles.statusButton, styles.center, this.statusFocus('通報處理')]}
                            onPress = {() => {changeSource('通報處理');}}
                            >
                            <Text style={styles.statusText}>
                                通報處理
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor = "#ccc"
                            style = {[styles.statusButton, this.statusFocus('已處理')]}
                            onPress = {() => {changeSource('已處理');}}
                            >
                            <Text style={styles.statusText}>
                                已處理
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    initialListSize = {1}
                    pageSize = {1}
                    dataSource = {dataSource}
                    scrollRenderAheadDistance = {50}
                    renderRow = {this.renderEachSource}
                    style = {styles.listView}
                    onEndReachedThreshold = {0}
                    onEndReached = {onEndReached}

                    />

            </View>
        );
    }
    renderEachSource(source) {
        const WaitDone = source.status === '通報處理'?
        require('../../img/check-1.png') :
        require('../../img/check-0.png');
        const Done = source.status === '已處理'?
        require('../../img/check-1.png') :
        require('../../img/check-0.png');
        const Not = source.status === '非孳生源'?
        require('../../img/cross-1.png') :
        require('../../img/cross-0.png');
        //return null;
        return(
            <EachBreedingSourceReport
                Done = {Done}
                Not = {Not}
                WaitDone = {WaitDone}
                source = {source}
                status = {this.props.status}
                updateData ={this.props.updateData}
                />
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
        width: CONSTANTS.screenWidth * 0.8,
        marginTop:10,
        flexDirection:'row',
        borderWidth: 1,
        borderColor:'#ccc',
        borderRadius:3,

    },
    statusButton: {
        alignItems: 'center',
        flex:1,
        padding:10,
    },
    statusText: {
        fontSize: 16,
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
        fontSize: 24,
        fontWeight: 'bold',
    },
    sourceNumber: {
        color: CONSTANTS.mainColor,
    },
    listView: {

    },

});
