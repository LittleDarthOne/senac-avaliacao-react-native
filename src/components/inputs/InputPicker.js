import React, { Component }         from 'react';
import { StyleSheet, Text, Picker } from 'react-native';

import InputContainer from './InputContainer';
import ConfirmModal   from 'components/ConfirmModal';

export default class InputPicker extends Component {

  static defaultProps = {
    emptyText: 'Nenhuma opção disponível',
  };

  state = {
    modalVisible:  false,
    selectedValue: undefined,
  };

  equals = (item1, item2) => {
    return item1 == item2 || ((item1 && item1.id) == (item2 && item2.id));
  };

  handlePress = () => {
    this.setState({modalVisible: true});
  };

  handleConfirm = () => {
    const { onConfirm, onChange, data, value } = this.props;
    const { selectedValue }                    = this.state;

    if (onConfirm)
      onConfirm();

    if (onChange) {
      const selected = selectedValue || (data && data.length > 0 && data[0]);
      if (!this.equals(value, selected))
        onChange(selected);
    }

    this.setState({modalVisible: false});
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel)
      onCancel();

    this.setState({modalVisible: false});
  };

  render() {
    const { modalVisible, selectedValue } = this.state;
    const { value, data, itemLabelExtractor, label, leftIcon, rightIcon, style, labelStyle, inputStyle, placeholder, emptyText, onPress, onCancel, onConfirm, onChange, ...pickerProps } = this.props;
    const inputContainerProps = { label, leftIcon, style, labelStyle, inputStyle };

    const isEmpty = !data || !data.length;

    return (
      <InputContainer rightIcon="caret-down" onPress={this.handlePress} {...inputContainerProps}>
        {!value && (
          <Text style={[InputContainer.textStyle, InputContainer.placeholderTextStyle]}>
            {placeholder}
          </Text>
        )}

        {value && (
          <Text style={[InputContainer.textStyle]}>
            {itemLabelExtractor ? itemLabelExtractor(value) : value}
          </Text>
        )}

        <ConfirmModal visible={modalVisible} onConfirm={this.handleConfirm} onCancel={this.handleCancel} disabled={isEmpty} dismissable={false}>
          {!isEmpty && (
            <Picker
              {...pickerProps}
              selectedValue={data.find(value => this.equals(value, selectedValue)) || (!isEmpty && data[0])}
              onValueChange={selectedValue => this.setState({ selectedValue })}
            >
              {data.map((value, index) => (
                <Picker.Item key={index} value={value} label={itemLabelExtractor ? itemLabelExtractor(value) : value} />
              ))}
            </Picker>
          )}

          {isEmpty && (
            <Text style={[InputContainer.textStyle, InputContainer.placeholderTextStyle, styles.emptyText]}>
              {emptyText}
            </Text>
          )}
        </ConfirmModal>
      </InputContainer> 
    );
  };

};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    margin: 32,
  },
});