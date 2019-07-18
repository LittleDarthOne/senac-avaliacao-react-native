import { AsyncStorage } from 'react-native';
import EventEmitter     from 'EventEmitter';

import HTTPService from './HTTPService';

const STORAGE_KEY    = 'authToken';
const __eventEmitter = new EventEmitter();
let   __authToken;

const __setToken = async (token) => {
  await AsyncStorage.setItem(STORAGE_KEY, token);
  __authToken = token;
};

const __clearToken = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
  __authToken = undefined;
  __eventEmitter.emit('logout');
};

export const getToken = async () => {
  let token = __authToken || await AsyncStorage.getItem(STORAGE_KEY);

  if (token && token.length)
    return token;
};

export const login = async ({ username, password }) => {
  try {
    const response = await HTTPService.post('/login', { username, password });
    __setToken(response.data.token);
  } catch(error) {
    const { data } = error.response;

    if (data.status == 400 || data.status == 404)
      throw 'Usuário ou senha inválidos';
    else
      throw 'Ocorreu um problema durante a autenticação';
  }
}

export const logout = () => {
  try {
    HTTPService.put('/logout');
    __clearToken();
  } catch(error) {
    throw 'Ocorreu um problema inesperado';
  }
}

export const addLogoutListener = (listener) => {
  return __eventEmitter.addListener('logout', listener);
};

