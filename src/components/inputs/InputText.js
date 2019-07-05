import React, { Component }                  from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Colors from 'utils/Colors';

export default class InputText extends Component {
  render() {
    const { label, leftIcon, rightIcon, style, labelStyle, inputStyle, ...inputProps } = this.props;

    return (
      <View style={[styles.container, style]}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <View style={[styles.inputContainer, inputStyle]}>
          {leftIcon && <FontAwesomeIcon size={16} icon={leftIcon} color={styles.input.color} style={styles.leftIcon} />}
          <TextInput style={styles.input} {...inputProps} />
          {rightIcon && <FontAwesomeIcon size={16} icon={rightIcon} color={styles.input.color} style={styles.rightIcon} />}
        </View>
      </View> 
    );
  };
};

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

  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.DEFAULT_TEXT,
  },

  leftIcon: {
    marginRight: 8,
  },

  rightIcon: {
    marginLeft: 8,
  },
});