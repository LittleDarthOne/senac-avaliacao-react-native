import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { createCustomStackNavigator } from 'components/navigation/Navigator';
import ScreenContainer                from 'components/ScreenContainer';
import InputText                      from 'components/inputs/InputText';
import { PrimaryButton }              from 'components/action/Button';

import { addVisitor }    from 'services/VisitorsService';

import Colors from 'utils/Colors';

export default class ConfigScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Visitante'),
    };
  };

  constructor(props) {
    super(props);

    const visitor = props.navigation.getParam('visitor') || {};

    this.state = { 
      loading: false,
      visitor: {...visitor},
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ 
      title: this.state.visitor.id ? 'Modificar visitante' : 'Adicionar visitante', 
    });
  };

  save = async () => {
    const { visitor } = this.state;

    this.setState({
      loading: true,
    });

    await addVisitor(visitor);

    this.props.navigation.goBack();
  };

  render() {
    const { loading, visitor } = this.state;

    return (
      <ScreenContainer loading={loading} scrollable={false} style={styles.container}>
        <InputText 
          style={styles.input}
          textContentType="name" 
          label={"Nome " + visitor.id}
          leftIcon="user"
          placeholder="Informe o nome do visitante" 
          value={visitor.name}
          onChangeText={(name) => this.setState(state => {
            state.visitor.name = name;
            return state;
          })}
        />

        <InputText 
          style={styles.input}
          label="Documento de identificação"
          leftIcon="id-card"
          placeholder="Documento ou placa do veículo" 
          value={visitor.document}
          onChangeText={(document) => this.setState(state => {
            state.visitor.document = document;
            return state;
          })}
        />

        <InputText 
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          label="Observações"
          placeholder="Outro dados importantes que devam ser observados pela portaria" 
          value={visitor.observation}
          onChangeText={(observation) => this.setState(state => {
            state.visitor.observation = observation;
            return state;
          })}
        />

        <PrimaryButton title="Salvar" onPress={this.save} />
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