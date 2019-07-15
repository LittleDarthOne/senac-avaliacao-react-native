import React, { Component }                                    from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Colors from 'utils/Colors';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },

  label: {
    fontSize: 14,
    color: Colors.LIGHT_TEXT,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_TEXT,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    overflow: 'hidden',
  },

  inputText: {
    flex: 1,
    fontSize: 16,
    color: Colors.DEFAULT_TEXT,
  },

  inputPlaceholderText: {
    color: Colors.LIGHT_TEXT,
  },

  leftIcon: {
    marginRight: 8,
  },

  rightIcon: {
    marginLeft: 8,
  },
});

export default class InputPicker extends Component {
  static textStyle = styles.inputText;
  static placeholderTextStyle = styles.inputPlaceholderText;

  render() {
    const { label, leftIcon, rightIcon, style, labelStyle, inputStyle, onPress, children } = this.props;
    const InputContainerComponent = onPress ? TouchableOpacity : View;

    return (
      <View style={[styles.container, style]}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <InputContainerComponent style={[styles.inputContainer, inputStyle]} onPress={onPress}>
          {leftIcon && <FontAwesomeIcon size={16} icon={leftIcon} color={styles.inputText.color} style={styles.leftIcon} />}
          <View style={{flex: 1, height: 22, flexDirection: 'row', alignItems: 'center', borderColor: 'red', borderWidth: 1}}>
          {children}
          </View>
          {rightIcon && <FontAwesomeIcon size={16} icon={rightIcon} color={styles.inputText.color} style={styles.rightIcon} />}
        </InputContainerComponent>
      </View> 
    );
  };
};