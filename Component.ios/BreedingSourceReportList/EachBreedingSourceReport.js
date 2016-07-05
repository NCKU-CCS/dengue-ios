import React, {
    View,
    TouchableHighlight,
    Component,
    StyleSheet,
    Text,
    Image
} from 'react-native';

export default class EachBreedingSourceReport extends Component {
    constructor(props) {
        super(props);

    }
    updateStatus(source, changeStatus){
        let formData = new FormData();
        const {
            updateData,
            status
        } = this.props;
        formData.append('database','tainan');
        formData.append('source_id', source.source_id);
        formData.append('status', changeStatus);
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

            return updateData(status, changeStatus);
        })
        .then(() => {
            alert('更新完成！');
        })
        .catch( err => {
            alert('更新失敗！');
            console.warn(err);
        });
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
        } = this.props;
        return(
            <View style={styles.eachList}>
                <View style={styles.source}>
                    <View style={styles.leftSide}>
                        <View style={styles.title}>
                            <Image style = {styles.titleImage}
                                source = {this.titleImage(source.source_type)}
                            />
                            <Text style = {styles.titleText}>
                                {source.modified_address}
                            </Text>
                        </View>
                        <Text style={styles.description}>
                            {source.address}
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
                        source = {{uri: `data:image/png;base64,${source.photo_base64}`}}
                        >
                    </Image>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight
                        underlayColor = '#fff'
                        style = {styles.buttonTouch}
                        onPress={()=>{this.updateStatus(source,'已處理');}}
                        >
                        <View
                            style={styles.button}

                        >
                            <Image style = {styles.icon} source = {Done} />
                            <Text style = {styles.text}>
                                已處理
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor = '#fff'
                        style = {styles.buttonTouch}
                        onPress={()=>{this.updateStatus(source,'通報處理');}}
                        >
                        <View style={styles.button}>
                            <Image style = {styles.icon} source = {WaitDone} />
                            <Text style={styles.text}>
                                通報處理
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor = '#fff'
                        style = {styles.buttonTouch}
                        onPress={()=>{this.updateStatus(source,'非孳生源');}}
                        >
                        <View style={styles.button}>
                            <Image style = {styles.icon} source = {Not} />
                            <Text style={styles.text}>
                                非孳生源
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
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
        fontSize:30,
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
    },
    text: {
        color: '#aaa'
    },

});
