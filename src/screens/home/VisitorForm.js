import React, { Component }              from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

import { createCustomStackNavigator } from 'components/navigation/Navigator';
import ScreenContainer                from 'components/ScreenContainer';
import InputText                      from 'components/inputs/InputText';
import { PrimaryButton }              from 'components/action/Button';
import { PrimaryLink }                from 'components/action/Link';

import { saveVisitor, deleteVisitor } from 'services/VisitorsService';

import Colors from 'utils/Colors';

export default class ConfigScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Visitante'),
    };
  };

  constructor(props) {
    super(props);

    const visitor  = props.navigation.getParam('visitor') || {};
    const onAction = props.navigation.getParam('onAction');

    this.state = { 
      loading: false,
      visitor: {...visitor},
      onAction,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ 
      title: this.state.visitor.id ? 'Modificar visitante' : 'Adicionar visitante', 
    });
  };

  save = async () => {
    const { visitor, onAction } = this.state;
    const { navigation }        = this.props;

    this.setState({ loading: true });

    try {
      const savedVisitor = await saveVisitor(visitor);
      this.setState({ loading: false }, () => {
        Alert.alert(undefined, 'Visitante salvo com sucesso!', [{ 
          text: 'OK', 
          onPress: () => {
            if (onAction)
              onAction(savedVisitor);

            navigation.goBack();
          }
        }]);
      });
    } catch(error) {
      this.setState({ loading: false }, () => {
        Alert.alert(undefined, error, [{ text: 'OK' }]);
      });
    }
  };

  delete = async () => {
    const { visitor, onAction } = this.state;
    const { navigation }        = this.props;

    this.setState({ loading: true });

    try {
      await deleteVisitor(visitor);
      visitor.__deleted = true;
      this.setState({ loading: false }, () => {
        Alert.alert(undefined, 'Visitante excluído com sucesso!', [{ 
          text: 'OK', 
          onPress: () => {
            if (onAction)
              onAction(visitor);

            navigation.goBack();
          }
        }]);
      });
    } catch(error) {
      this.setState({ loading: false }, () => {
        Alert.alert(undefined, error, [{ text: 'OK' }]);
      });
    }
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
        <PrimaryLink 
          style={styles.link} 
          text="Excluir" 
          onPress={() => {
            Alert.alert("Atenção!", "Tem certeza de que deseja excluir este visitante?", [
              {text: 'Não'},
              {text: 'Sim, excluir', onPress: this.delete},
            ])
          }} 
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

  link: {
    margin: 16,
  },

});