import React from 'react';
import { View,TouchableOpacity, Text, } from 'react-native';
import CONSTANTS from '../Global.js';
export default function Button({ onPress, buttonText }) {
  return(
    <TouchableOpacity
      onPress={onPress}
      style={styles.signup}
      underlayColor={CONSTANTS.backgroundColor}
    >
      <Text style={styles.signupText}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );

}

const styles = {
  signup: {
    //height: 40,
    width:200,
    marginTop: 15,
    paddingVertical: 8,
    //paddingHorizontal: 25,
    backgroundColor: CONSTANTS.mainColor,
    borderRadius :5,
    borderColor: CONSTANTS.mainColor,
    borderWidth:1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

  },
  signupText: {
    fontSize: 20,
    color: '#fff',
  },
}
