import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ScreenContainer   from 'components/ScreenContainer';

export default class MyWhitelist extends Component {
  constructor(props) {
    super(props);

    this.state ={ 
      loading:   true,
      whitelist: [],
    };
  };

  componentDidMount() {
    this.setState({
      loading: false,
    });
  };

  addWhitelisted = () => {};

  render() {
    const { loading, whitelist }  = this.state;
    const { navigation }       = this.props;

    return (
      <ScreenContainer title="Visitantes autorizados" loading={loading} rightIcon="plus-circle" onPressRightIcon={this.addWhitelisted} style={styles.container}>
        <Text>Montar lista de vistantes autorizados, podendo adicionar novos, editar e remover cada um</Text>
      </ScreenContainer> 
    );
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});