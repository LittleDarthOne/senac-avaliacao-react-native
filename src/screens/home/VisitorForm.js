import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { createCustomStackNavigator } from 'components/navigation/Navigator';
import ScreenContainer                from 'components/ScreenContainer';
import InputText                      from 'components/inputs/InputText';

import Colors from 'utils/Colors';

export default class ConfigScreen extends Component {
  static navigationOptions = {
    title: 'Visitante', 
  };

  componentDidMount() {
    this.props.navigation.setParams({ 
      title: 'Novo visitante', 
    });
  };

  constructor(props) {
    super(props);

    const visitor = props.navigation.getParam('visitor', {});

    this.state = { 
      loading: false,
      visitor,
    };
  };

  render() {
    const { loading, visitor } = this.state;

    return (
      <ScreenContainer loading={loading} scrollable={false} style={styles.container}>
        <InputText 
          style={styles.input}
          textContentType="name" 
          label="Nome"
          leftIcon="user"
          placeholder="Informe o nome do visitante" 
          value={visitor.name}
          onChangeText={(name) => this.setState(state => {
            state.visitor.name = name;
            return state;
          })}
        />
      </ScreenContainer>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  input: {
    marginBottom: 24,
  },

});