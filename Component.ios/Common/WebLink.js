import React from 'react';
import { View,TouchableHighlight, Text,
  Linking,
} from 'react-native';
import CONSTANTS from '../Global.js';
export default function WebLink() {
  return(
    <TouchableHighlight
    onPress={() => Linking.openURL('https://www.denguefever.tw')}
      style={styles.button}
      underlayColor="#ccc"
    >
      <Text style={styles.buttonText}>
        掌蚊人官網
      </Text>
    </TouchableHighlight>
  );

}

const styles = {
  button: {
    //height: 40,
    width:200,
    marginTop: 15,
    paddingVertical: 8,
    //paddingHorizontal: 25,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius :5,
    borderWidth:1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    fontSize: 20,
    color: '#333',
  },
}
