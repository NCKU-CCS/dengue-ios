import React, {
  Component,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';
export default class EachSource extends Component {
  render() {
    const {
      enterCheckPage,
      source
    } = this.props;
    return (
      <TouchableOpacity
        style={styles.eachList}
        onPress={() => {
          enterCheckPage(source);
        }}
        activeOpacity = {0.5}>
        <View>
          <View style={styles.name}>
            <Text style={styles.nameText}>{source.name}</Text>
          </View>
          <View style={styles.address}>
            <Image
              style = {styles.icon}
              source = {require('../../img/location.png')}
            />
            <View style = {styles.addView}>
              <Text>{source.address}</Text>
            </View>
          </View>
          <View style={styles.phone}>
            <Image
              style = {styles.icon}
              source={require('../../img/telephone.png')}
            />
            <Text>{source.phone}</Text>
          </View>
          <Text style = {styles.text}>
            〉
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  name: {
    flex: 2,
    justifyContent: 'center',
    marginBottom: 10,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
  },
  addView: {
    width: 150,
  },
  address: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
  },
  phone: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 15,
  },
  eachList: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    height: 130,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    position: 'absolute',
    right: 5,
    top: 40,
  },
});
