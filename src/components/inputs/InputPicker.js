import React, { Component }    from 'react';
import { Text, Modal, Picker } from 'react-native';

import InputContainer from './InputContainer';
import ConfirmModal   from 'components/ConfirmModal';

export default class InputPicker extends Component {
  handlePress = () => {
    console.log('PRESS INPUT SELECT');
    this.setState({modalVisible: true});
  };

  state = {
    modalVisible: false,
  };

  render() {
    const { modalVisible } = this.state;
    const { label, leftIcon, rightIcon, style, labelStyle, inputStyle, placeholder, onPress, ...pickerProps } = this.props;
    const inputContainerProps = { label, leftIcon, style, labelStyle, inputStyle };

    return (
      <InputContainer rightIcon="caret-down" onPress={this.handlePress} {...inputContainerProps}>
        <Text style={[InputContainer.textStyle, InputContainer.placeholderTextStyle]}>
          {placeholder}
        </Text>

        <ConfirmModal visible={modalVisible} />
      </InputContainer> 
    );
  };
};