import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { createCustomStackNavigator } from 'components/navigation/Navigator';
import ScreenContainer                from 'components/ScreenContainer';
import InputText                      from 'components/inputs/InputText';

import Colors from 'utils/Colors';

export default class ConfigScreen extends Component {
  static navigationOptions = {
    title: 'Formulário de visitante', 
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
        <InputText 
          label="Nome" 
          placeholder="Informe o nome do visitante" 
        />
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