import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
export default class DengueTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.value = props.defaultValue ? props.defaultValue : '';
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue)
      this.value = nextProps.defaultValue ? nextProps.defaultValue : '';
  }
  onFocus() {
    this.refs.textInput.focus();
  }
  render() {
    const {
      label, // string
      keyboardType, // string
      maxLength, // number
      secure, // boolean
      returnKeyType, // string
      onSubmitEditing, // function
      placeholder, // string
      onFocus, // function
      style,
      multiline,
      onEndEditing,
      defaultValue,
    } = this.props;
    return (
      <View style = {styles.container}>
        <Text style = {styles.label}>
          {label}
        </Text>
        <TextInput
          style = {[styles.textInput, style]}
          onChangeText = {text => {
this.value=text;
}}
          onFocus = {() => onFocus(this.refs.textInput)}
          keyboardType = {keyboardType ? keyboardType : 'default'}
          selectTextOnFocus = {false}
          secureTextEntry = {secure ? secure : false}
          autoCapitalize = "none"
          autoCorrect = {false}
          placeholder = {placeholder}
          returnKeyType = {returnKeyType}
          onSubmitEditing = {onSubmitEditing ? onSubmitEditing : () => {}}
          onEndEditing = {() => {
 onEndEditing(this.value);
}}
          ref = "textInput"
          defaultValue={defaultValue}
          maxLength = {maxLength ? maxLength : 64}
          multiline = {multiline ? multiline : false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
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
    fontSize: 18,
    paddingVertical: 10,
    height: 50,
    alignSelf: 'center',
    flex: 1,
  }
});
