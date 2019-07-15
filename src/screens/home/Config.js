import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { createCustomStackNavigator } from 'components/navigation/Navigator';
import { DrawerButton }               from 'components/navigation/Header';
import ScreenContainer                from 'components/ScreenContainer';

import Colors from 'utils/Colors';

class ConfigScreen extends Component {
  static navigationOptions = {
    title: 'Configurações', 
    headerLeft: <DrawerButton />
  };

  constructor(props){
    super(props);

    this.state = { 
      loading: false,
    };
  };

  render() {
    const { loading } = this.state;

    return (
      <ScreenContainer loading={loading} scrollable={false} style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Vai ter!
          </Text>
        </View>
      </ScreenContainer>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  emptyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
  },

  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.DEFAULT_TEXT,
  },

});

export default createCustomStackNavigator({ ConfigScreen });