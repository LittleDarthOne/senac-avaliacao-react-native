import EventEmitter     from 'EventEmitter';
import { AsyncStorage } from 'react-native';

import HTTPService            from './HTTPService';
import { addLogoutListener }  from './AuthenticationService';

const ENDPOINT       = '/profiles';
const __eventEmitter = new EventEmitter();
let   __profile;
let   __profilePicture;

const __setProfile   = (profile, profilePicture) => {
  if (profile && !profile.phones)
    profile.phones = [];
  if (profile && !profile.phones.length)
    profile.phones.push({});

  __profile        = profile;
  __profilePicture = profilePicture;
  __eventEmitter.emit('save', {
    profile:        __profile, 
    profilePicture: __profilePicture
  });
};

addLogoutListener(() => __setProfile(undefined, undefined));

export const createProfile = async (data) => {
  try {
    const profile = {...data};
    profile.cpf  = profile.username;
    profile.name = profile.username;

    const response = await HTTPService.post(ENDPOINT, profile);

    return response.data;
  } catch(error) {
    const { data } = error.response;
    console.log('ERROR:', data);

    if (data.message.includes('already registered'))
      throw 'Já existe um cadastro com este CPF';
    else if (data.message.includes('is required'))
      throw 'É necessário um CPF e uma senha para criar o seu cadastro';
    else
      throw 'Ocorreu um problema inesperado';
  }
};

export const getProfile = async () => {
  if (__profile)
    return __profile;

  try {
    const response       = await HTTPService.get(ENDPOINT + '/my-profile');
    const profilePicture = await AsyncStorage.getItem(`profilePicture${response.data.id}`);
    __setProfile(response.data, profilePicture);

    return __profile;
  } catch(error) {
    const { data } = error.response;
    console.log('GET PROFILE ERROR:', data);

    throw 'Ocorreu um problema inesperado';
  }
};

export const saveProfile = async (data, picture) => {
  try {
    const profile = {...data};
    if (profile.phones)
      profile.phones = profile.phones.filter(phone => !!phone.number);

    const response = await HTTPService.put(ENDPOINT + '/my-profile', profile);
    await AsyncStorage.setItem(`profilePicture${response.data.id}`, picture);
    __setProfile(response.data, picture);

    return __profile;
  } catch(error) {
    const { data } = error.response;
    console.log('SAVE PROFILE ERROR:', data);

    if (data.message.includes('is required'))
      throw 'Seu nome e seu CPF são obrigatórios e não podem ficar em branco';
    else if (data.message.includes('already registered'))
      throw 'Já existe um cadastro com este CPF';
    else if (data.message.includes('does not exists'))
      throw 'A residência selecionada é inválida, escolha outro valor';
    else
      throw 'Ocorreu um problema inesperado';
  }
};

export const getProfilePicture = () => {
  return __profilePicture;
};

export const addProfileSaveListener = (listener) => {
  return __eventEmitter.addListener('save', listener);
};