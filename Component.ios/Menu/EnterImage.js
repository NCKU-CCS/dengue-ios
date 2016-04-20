import React, {
    AppRegistry,
    Component,
    TextInput,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import CONSTANTS from '../Global.js';

export default class EnterImage extends Component {

    constructor(props){
        super(props);
        this.state={};
        switch (props.page) {
            case 'mosquitoBiteReport':
                this.state.title='蚊子叮咬舉報';
                this.state.uri='http://www.opcpest.com/res/images/pest-detail-images/og_mosquito-icon_1.png';
                break;
            case 'breedingSourceReport':
                this.state.title='孳生源舉報';
                this.state.uri='http://www.opcpest.com/res/images/pest-detail-images/og_mosquito-icon_1.png';
                break;
            case 'breedingSourceReportList':
                this.state.title='孳生源列表';
                this.state.uri='http://www.opcpest.com/res/images/pest-detail-images/og_mosquito-icon_1.png';
                break;
            case 'hotZoneInfo':
                this.state.title='熱區資訊';
                this.state.uri='http://www.opcpest.com/res/images/pest-detail-images/og_mosquito-icon_1.png';
                break;
            case 'hospitalInfo':
                this.state.title='就醫資訊';
                this.state.uri='http://www.opcpest.com/res/images/pest-detail-images/og_mosquito-icon_1.png';
                break;
            case 'first':
                this.state.title='';
                this.state.uri='http://www.opcpest.com/res/images/pest-detail-images/og_mosquito-icon_1.png';
                break;
            default:

        }
        this.press = this.press.bind(this);
    }
    render() {
        return(
            <TouchableHighlight underlayColor="#aaa" style={styles.touch} onPress={this.press}>
                <View style={styles.view}>
                    <Image  style={styles.icon} source={{uri:this.state.uri}}>
                    </Image>
                    <Text style={styles.text}>
                        {this.state.title}
                    </Text>
                </View>
            </TouchableHighlight>
        )

    };
    press(){
        this.props._enter(this.props.page);
    }

}
var styles = StyleSheet.create({
    touch: {
        flex:1,
        margin: 0,
        borderWidth:1,
        borderColor: "#94b8a6",
        borderStyle:'solid',
        borderRadius: 1,
        alignItems:'center',
        backgroundColor: "#fff",
        flexDirection:'row',

    },
    view:{
        flex:1,
    },
    icon:{
        flex:1,
        height:100,
        borderRadius:10,
        resizeMode:"contain",
        marginVertical:20,
    },
    text:{
        alignSelf:'center',
        marginBottom:10,
    }

})
