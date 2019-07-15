import React, { Component } from 'react';
import { TextInput }        from 'react-native';

import InputContainer from './InputContainer';

export default class InputText extends Component {
  render() {
    const { label, leftIcon, rightIcon, style, labelStyle, inputStyle, onPress, ...inputProps } = this.props;
    const inputContainerProps = { label, leftIcon, rightIcon, style, labelStyle, inputStyle };

    return (
      <InputContainer {...inputContainerProps}>
        <TextInput 
          style={InputContainer.textStyle} 
          placeholderTextColor={InputContainer.placeholderTextStyle.color} 
          {...inputProps} 
        />
      </InputContainer> 
    );
  };
};