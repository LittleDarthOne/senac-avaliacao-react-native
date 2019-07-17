import React, { Component } from 'react';
import { TextInput }        from 'react-native';

import InputContainer from './InputContainer';

export default class InputText extends Component {
  render() {
    const { label, leftIcon, rightIcon, style, labelStyle, inputStyle, onPress, ...inputProps } = this.props;
    const inputContainerProps = { label, leftIcon, rightIcon, style, labelStyle, inputStyle };

    const isMultiline           = inputProps.multiline && inputProps.numberOfLines;
    const contentContainerStyle = isMultiline ? { height: InputContainer.HEIGHT * inputProps.numberOfLines } : {};

    return (
      <InputContainer contentContainerStyle={contentContainerStyle} {...inputContainerProps}>
        <TextInput 
          style={[InputContainer.textStyle, isMultiline && { textAlignVertical: 'top' }]} 
          placeholderTextColor={InputContainer.placeholderTextStyle.color} 
          {...inputProps} 
        />
      </InputContainer> 
    );
  };
};