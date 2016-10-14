

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import CONSTANTS from '../Global.js';
export default class DengueTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.state = {
      text: props.defaultValue ? props.defaultValue : ''
    }
    console.log(props.defaultValue);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.defaultValue ?
      nextProps.defaultValue :
      ''
    })
  }
  onFocus() {
    this.refs.textInput.focus();
  }
  onChangeText(textInput) {
    this.props.onChangeText(textInput);
    this.setState({text: textInput});
  }
  render() {
    const {
      label, //string
      keyboardType, // string
      maxLength, // number
      secure, // boolean
      returnKeyType, // string
      onSubmitEditing, // function
      placeholder, //string
      onFocus, // function
      hint, //array<strin>
    } = this.props;
    const {
      text
    } = this.state;
    return (
      <View style = {styles.container}>
        <Text style = {styles.label}>
          {label}
        </Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {this.onChangeText}
          onFocus = {() => onFocus(this.refs.textInput)}
          keyboardType = {keyboardType ? keyboardType : "default"}
          selectTextOnFocus = {false}
          secureTextEntry = {secure ? secure : false}
          autoCapitalize = "none"
          value={text}
          autoCorrect = {false}
          placeholder = {placeholder}
          returnKeyType = {returnKeyType}
          onSubmitEditing = {onSubmitEditing ? onSubmitEditing : () => {}}
          ref = "textInput"
          maxLength = {maxLength ? maxLength : 32}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    alignSelf: 'center',
  },
  label: {
    color: '#333',
    fontSize: 16,
    position: 'absolute',
    top: -16,
    left: 0,
  },
  hints: {
    flexDirection: 'column',
  },
  hint: {
    color: '#aaa',
    fontSize: 14,
  },
  textInput: {
    backgroundColor: CONSTANTS.backgroundColor,
    height: 30,
    alignSelf: 'center',
    flex: 1,
  }
})
