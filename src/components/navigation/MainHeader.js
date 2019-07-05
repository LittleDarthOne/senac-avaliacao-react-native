import React, { Component }                         from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Header, withNavigation }                   from 'react-navigation';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Colors from 'utils/Colors';

class MainHeader extends Component {

  render() {
    const { navigation, title, subtitle, rightIcon, onPressRightIcon } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.lateralIconContainer} onPress={() => navigation.openDrawer()}>
          <FontAwesomeIcon size={22} icon="bars" color={Colors.WHITE} />
        </TouchableOpacity>

        <View style={styles.centerSpace}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <TouchableOpacity style={styles.lateralIconContainer} onPress={onPressRightIcon}>
          {rightIcon && <FontAwesomeIcon size={22} icon={rightIcon} color={Colors.WHITE} />}
        </TouchableOpacity>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    height: Header.HEIGHT, 
    backgroundColor: Colors.PRIMARY,
    padding: 8,
  },

  lateralIconContainer: {
    width: (Header.HEIGHT - 16),
    height: (Header.HEIGHT - 16),
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerSpace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: Colors.WHITE,
    fontSize: 16,
  },

  subtitle: {
    color: Colors.WHITE,
    fontSize: 10,
  },
});

export default withNavigation(MainHeader)