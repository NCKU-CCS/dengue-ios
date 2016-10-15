import React, {
    View,
    TouchableHighlight,
    Component,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import { requestUpdateStatus } from '../../Actions.ios/index.js';
import { connect } from 'react-redux';
class EachBreedingSourceReport extends Component {
    constructor(props) {
        super(props);

    }
    updateStatus(source, changeStatus){
        let formData = new FormData();
        const {
            updateData,
            status,
            dispatch
        } = this.props;
        formData.append('database','tainan');
        formData.append('source_id', source.source_id);
        formData.append('status', changeStatus);
      //dispatch(requestUpdateStatus(status, formData));
    }
    titleImage(type) {
        switch (type) {
            case '住家容器':
                return require('../../img/home.png');
            case '戶外容器':
                return require('../../img/outContainer.png');
            case '戶外髒亂處':
                return require('../../img/outMess.png');
            default:

        }
    }
    render() {
        const {
            source,
            Done,
            Not,
          WaitDone,
          selectedStatus
        } = this.props;
        return(
            <View style={styles.eachList}>
                <View style={styles.source}>
                    <View style={styles.leftSide}>
                        <View style={styles.title}>
                            <Text style = {styles.titleText}>
                                {source.modified_address}
                            </Text>
                        </View>
                        <Text style={styles.description}>
                            {source.description}
                        </Text>
                        <Text style={styles.createdTime}>
                            {source.created_at.match(/(.+)\./)[1]}
                        </Text>
                    </View>
                    <Image
                        style = {styles.rightSide}
                        source = {{uri: `data:image/png;base64,${source.photo_base64}`}}
                        >
                    </Image>
                </View>
            </View>
        );
    }
}
function select(state) {
  return {
    selectedStatus: state.breedingSourceList.status
  }
}
export default connect(select)(EachBreedingSourceReport);
const styles = StyleSheet.create({
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
        flexDirection:'column',
    },
    title: {
        flexDirection: 'row',
        marginTop:10,

    },
    titleImage: {
        resizeMode: 'contain',
        height:30,
        width:30,
        alignSelf: 'center',
    },
    titleText: {
        fontSize:22,
        flex:1,
        fontWeight:'bold',
    },
    description: {
        marginTop:20,

    },
    createdTime: {
        position:'absolute',
        bottom:10,
    },
    rightSide: {
        flex: 0.4,
        alignItems: 'flex-end',
        resizeMode: 'contain',
    },
    icon: {
        height:24,
        resizeMode: 'contain',
        marginVertical: 8,
    },
    buttons: {
        height:40,
        flexDirection: 'row',
    },
    buttonTouch: {
        flex:1,
    },
    button: {
        justifyContent:'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#ddd',
      flexDirection: 'row',
      flex:1,
    },
    text: {
        color: '#aaa'
    },
    selectedText: {
      color: '#333',
    }

});
