import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { createCustomStackNavigator }         from 'components/navigation/Navigator';
import { DrawerButton }                       from 'components/navigation/Header';
import ScreenContainer                        from 'components/ScreenContainer';
import ProfilePicture                         from 'components/ProfilePicture';
import Separator                              from 'components/Separator';
import InputText                              from 'components/inputs/InputText';
import InputPicker                            from 'components/inputs/InputPicker';
import { PrimaryButton, SecondaryIconButton } from 'components/action/Button';
import { PrimaryLink }                        from 'components/action/Link';

import Colors from 'utils/Colors';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Meus dados', 
    headerLeft: <DrawerButton />
  };

  constructor(props) {
    super(props);

    this.state = { 
      loading: true,
      profile: {
        phones: [{}]
      },
    };
  };

  componentDidMount() {
    this.setProfile({
      name: 'Jeferson',
      cpf: '00969074018',
      email: 'jef.oli@gmail.com',
      phones: [{}],
    });
  };

  setProfile = (profile) => {
    if (profile && !profile.phones)
      profile.phones = [{}];

    this.setState({
      loading: false,
      profile: profile,
    });
  };

  addPhone = () => {
    this.setState(state => {
      state.profile.phones.push({});
      return state;
    });
  };

  removePhone = (index) => {
    this.setState(state => {
      state.profile.phones.splice(index, 1);
      if (!state.profile.phones.length)
        state.profile.phones.push({});
      return state;
    });
  };

  save = () => {
    const { profile } = this.state;

    this.setState({
      loading: true,
    });

    this.setProfile(profile);
  };

  render() {
    const { loading, profile } = this.state;
    const { navigation }       = this.props;

    return (
      <ScreenContainer loading={loading} style={styles.container}>
        <View style={styles.profilePictureContainer}>
          <ProfilePicture />
        </View>

        <InputText 
          style={styles.input}
          textContentType="name" 
          label="Nome" 
          leftIcon="user"
          placeholder="Informe seu nome" 
          value={profile.name}
          onChangeText={(text) => this.setState(state => {
            state.profile.name = text;
            return state;
          })}
        />
        
        <InputText 
          style={styles.input}
          keyboardType="number-pad" 
          label="CPF" 
          leftIcon="id-card" 
          placeholder="Informe seu CPF" 
          value={profile.cpf}
          onChangeText={(text) => this.setState(state => {
            state.profile.cpf = text;
            return state;
          })}
        />
        
        <InputPicker 
          style={styles.input}
          label="Residência"
          leftIcon="home" 
          placeholder="Selecione a sua residência" 
          value={profile.residence}
          onChange={(residence) => this.setState(state => {
            state.profile.residence = residence;
            return state;
          })}
        />

        <Separator text="DADOS DE CONTATO" style={styles.input} />

        <InputText 
          style={styles.input}
          textContentType="emailAddress" 
          keyboardType="email-address" 
          label="Endereço de e-mail" 
          leftIcon="at"
          placeholder="Informe o seu e-mail" 
          value={profile.email}
          onChangeText={(text) => this.setState(state => {
            state.profile.email = text;
            return state;
          })}
        />

        {profile.phones.map((phone, index) => {
          return <View style={[styles.phoneContainer, styles.input]} key={index}>
            <InputText 
              style={styles.phoneInput}
              textContentType="telephoneNumber" 
              keyboardType="number-pad" 
              label={'Telefone para contato ' + (index + 1)} 
              leftIcon="phone"
              placeholder="Informe o número do telefone" 
              value={phone.number}
              onChangeText={(text) => this.setState(state => {
                phone.number = text;
                return state;
              })}
            />
            <SecondaryIconButton icon="trash-alt" style={styles.deleteButton} onPress={() => this.removePhone(index)} /> 
          </View>
        })}

        <PrimaryLink text="Adicionar outro telefone" style={styles.input} onPress={() => this.addPhone()} /> 

        <PrimaryButton title="Salvar" onPress={this.save} />
      </ScreenContainer> 
    );
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  profilePictureContainer: {
    alignSelf: 'stretch',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },

  input: {
    marginBottom: 24,
  },

  phoneInput: {
    flex: 1,
    marginRight: 12
  },

  phoneContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  deleteButton: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});

export default createCustomStackNavigator({ ProfileScreen });