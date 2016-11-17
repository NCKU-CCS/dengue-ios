import React from 'react';
import {TouchableHighlight, Text,
  Linking,
} from 'react-native';
export default function FBLink() {
  return(
    <TouchableHighlight
    onPress={() => Linking.openURL('https://m.facebook.com/themosquitoman/')}
      style={styles.button}
      underlayColor="#29487D"
    >
      <Text style={styles.buttonText}>
        掌蚊人粉專
      </Text>
    </TouchableHighlight>
  );
}

const styles = {
  button: {
    // height: 40,
    width: 200,
    marginTop: 15,
    paddingVertical: 8,
    // paddingHorizontal: 25,
    backgroundColor: '#3B5998',
    borderColor: '#3B5998',
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
};
