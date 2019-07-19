import React, { Component }                                    from 'react';
import { StyleSheet, TouchableOpacity, Vibration, View, Text } from 'react-native';

import Colors from 'utils/Colors';

const vibrateOnPress = (onPress) => {
  Vibration.vibrate(50);

  if (onPress)
    onPress();
};

class BasicLink extends Component {

  render() {
    const { text, style, containerStyle, onPress, ...otherProps } = this.props;

    return (
      <TouchableOpacity 
        style={[styles.basicLinkContainer, containerStyle]} 
        onPress={() => vibrateOnPress(onPress)} 
        {...otherProps}
      >
        <Text style={[styles.linkText, style]}>{text}</Text>
      </TouchableOpacity> 
    );
  };
};

export class PrimaryLink extends Component {
  render() {
    const { style, ...otherProps } = this.props;

    return(
      <BasicLink style={[styles.primaryText, style]} {...otherProps} />
    );
  };
};

export class SecondaryLink extends Component {
  render() {
    const { style, ...otherProps } = this.props;

    return(
      <BasicLink style={[styles.secondaryText, style]} {...otherProps} />
    );
  };
};

const styles = StyleSheet.create({
  basicLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  linkText: {
    paddingHorizontal: 4,
    fontSize: 16,
    textAlign: 'center',
  },

  primaryText: {
    color: Colors.PRIMARY, 
  },

  secondaryText: {
    color: Colors.WHITE, 
  },
});