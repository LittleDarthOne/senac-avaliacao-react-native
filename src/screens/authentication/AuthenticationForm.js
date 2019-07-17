import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ScreenContainer     from 'components/ScreenContainer';
import InputText           from 'components/inputs/InputText';
import { SecondaryButton } from 'components/action/Button';
import { SecondaryLink }   from 'components/action/Link';

import { login }           from 'services/AuthenticationService';

import Colors              from 'utils/Colors';

const CREATION_MODE = 'create';
const AUTHENTICATION_MODE = 'authenticate';

export default class AuthenticationForm extends Component {

  constructor(props) {
    super(props);

    const mode = props.navigation.getParam('mode', AUTHENTICATION_MODE);

    this.state = {
      mode,
      username:       undefined,
      password:       undefined,
      error:          undefined,
      loadingMessage: undefined,
      loading:        false,
    };
  };

  handleButtonPress = async () => {
    const { mode, username, password } = this.state;
    const { navigation }               = this.props;

    this.setState({ 
      error: undefined, 
      loading: true, 
      loadingMessage: mode == AUTHENTICATION_MODE ? 'Autenticando, aguarde...' : 'Criando seu cadastro, aguarde...', 
    });

    try {
      if (mode == AUTHENTICATION_MODE) {
        await login({ username, password });
        navigation.navigate('Home');
      } else {
        await login({ username, password });
        navigation.navigate('Home');
      }
    } catch(error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLinkPress = () => {
    const { mode, username, password } = this.state;
    const { navigation } = this.props;

    if (mode == AUTHENTICATION_MODE)
      navigation.push('AuthenticationForm', { mode: CREATION_MODE });
    else
      navigation.goBack();
  };

  render() {
    const { mode, username, password, loading, error } = this.state;
    const submitTitle = mode == AUTHENTICATION_MODE ? 'Entrar' : 'Criar';
    const linkTitle   = mode == AUTHENTICATION_MODE ? 'Ainda não tenho cadastro' : 'Cancelar';

    return (
      <ScreenContainer loadingMessage="Autenticando, aguarde..." loading={loading} style={styles.container}>

        {mode == CREATION_MODE && (
          <Text style={styles.instructions}>
            Informe o seu CPF e uma senha. Estas serão suas credenciais de acesso.
          </Text>
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        <InputText 
          style={styles.inputContainer}
          inputStyle={styles.input}
          textContentType="username"
          keyboardType="number-pad" 
          maxLength={11} 
          leftIcon="id-card" 
          placeholder="Informe seu CPF" 
          value={username} 
          onChangeText={(username) => this.setState({ username })} 
        />

        <InputText 
          style={styles.inputContainer} 
          inputStyle={styles.input} 
          textContentType="password" 
          secureTextEntry={true} 
          leftIcon="lock" 
          placeholder="Informe sua senha" 
          value={password} 
          onChangeText={(password) => this.setState({ password })} 
        />

        <SecondaryButton title={submitTitle} onPress={this.handleButtonPress} />
        <SecondaryLink text={linkTitle} style={styles.link} onPress={this.handleLinkPress} />

      </ScreenContainer>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    padding: 32,
  },

  error: {
    textAlign: 'center',
    color: Colors.WHITE,
    opacity: 0.5,
    marginBottom: 16,
  },

  instructions: {
    color: Colors.WHITE,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },

  inputContainer: {
    marginBottom: 32,
  },

  input: {
    borderWidth: 0,
  },

  link: {
    margin: 16,
  }
});