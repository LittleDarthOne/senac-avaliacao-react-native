import React, { Component }                                    from 'react';
import { StyleSheet, TouchableOpacity, Vibration, View, Text } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Colors from 'utils/Colors';

const vibrateOnPress = (onPress) => {
  Vibration.vibrate(50);

  if (onPress)
    onPress();
};

class RoundedButton extends Component {
  render() {
    const { title, style, titleStyle, onPress, ...otherProps } = this.props;

    return (
      <TouchableOpacity 
        style={[styles.roundedButtonContainer, otherProps.disabled && styles.disabled, style]} 
        onPress={() => vibrateOnPress(onPress)}
        {...otherProps}
      >
        <Text style={[styles.roundedButtonTitle, titleStyle]}>{title}</Text>
      </TouchableOpacity> 
    );
  };
};

class IconButton extends Component {
  render() {
    const { icon, iconColor, iconStyle, style, onPress, ...otherProps } = this.props;

    return (
      <TouchableOpacity 
        style={[styles.iconButtonContainer, otherProps.disabled && styles.disabled, style]} 
        onPress={() => vibrateOnPress(onPress)}
        {...otherProps}
      >
        <FontAwesomeIcon size={20} icon={icon} color={iconColor} style={iconStyle} />
      </TouchableOpacity> 
    );
  };
};

class FloatingButton extends Component {
  static defaultProps = {
    position: {
      bottom: 16,
      right: 16,
    }
  };

  render() {
    const { icon, iconColor, iconStyle, position, style, onPress, ...otherProps } = this.props;

    return (
      <TouchableOpacity 
        style={[styles.floationgButtonContainer, position, otherProps.disabled && styles.disabled, style]} 
        onPress={() => vibrateOnPress(onPress)}
        {...otherProps}
      >
        <FontAwesomeIcon size={20} icon={icon} color={iconColor} style={iconStyle} />
      </TouchableOpacity> 
    );
  };
};

export class PrimaryButton extends Component {
  render() {
    const { style, titleStyle, ...otherProps } = this.props;

    return(
      <RoundedButton style={[styles.primaryContainer, style]} titleStyle={[styles.primaryTitle, titleStyle]} {...otherProps} />
    );
  };
};

export class SecondaryButton extends Component {
  render() {
    const { style, titleStyle, ...otherProps } = this.props;

    return(
      <RoundedButton style={[styles.secondaryContainer, style]} titleStyle={[styles.secondaryTitle, titleStyle]} {...otherProps} />
    );
  };
};

export class PrimaryIconButton extends Component {
  render() {
    const { style, ...otherProps } = this.props;

    return(
      <IconButton style={[styles.primaryContainer, style]} iconColor={styles.primaryTitle.color} {...otherProps} />
    );
  };
};

export class SecondaryIconButton extends Component {
  render() {
    const { style, ...otherProps } = this.props;

    return(
      <IconButton style={[styles.secondaryContainer, style]} iconColor={styles.secondaryTitle.color} {...otherProps} />
    );
  };
};

export class PrimaryFloatingButton extends Component {
  render() {
    const { style, ...otherProps } = this.props;

    return(
      <FloatingButton style={[styles.primaryContainer, style]} iconColor={styles.primaryTitle.color} {...otherProps} />
    );
  };
};

export class SecondaryFloatingButton extends Component {
  render() {
    const { style, ...otherProps } = this.props;

    return(
      <FloatingButton style={[styles.secondaryContainer, style]} iconColor={styles.secondaryTitle.color} {...otherProps} />
    );
  };
};

const BUTTON_HEIGHT = 50;

const shadow = {  
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const styles = StyleSheet.create({
  roundedButtonContainer: {
    height: BUTTON_HEIGHT,
    alignSelf: 'stretch',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (BUTTON_HEIGHT / 2),
    ...shadow,
  },

  iconButtonContainer: {
    height: 44,
    width: 44,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  floationgButtonContainer: {
    height: 60,
    width: 60,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
  },

  roundedButtonTitle: {
    paddingHorizontal: (BUTTON_HEIGHT / 2),
    fontSize: 20,
    textAlign: 'center',
    color: Colors.WHITE,
  },

  primaryContainer: {
    backgroundColor: Colors.PRIMARY,
    borderColor:     Colors.WHITE, 
  },  

  primaryTitle: {
    color: Colors.WHITE, 
  },

  secondaryContainer: {
    backgroundColor: Colors.WHITE,
    borderColor:     Colors.PRIMARY, 
  },  

  secondaryTitle: {
    color: Colors.PRIMARY, 
  },

  disabled: {
    opacity: 0.5,
  },
});