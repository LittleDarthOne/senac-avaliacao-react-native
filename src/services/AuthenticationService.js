import { AsyncStorage } from 'react-native';

import HTTPService from './HTTPService';

const STORAGE_KEY = 'authToken';
let authToken;

const setToken = async (token) => {
  await AsyncStorage.setItem(STORAGE_KEY, token);
  authToken = token;
};

const clearToken = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};

export const getToken = async () => {
  let token = authToken || await AsyncStorage.getItem(STORAGE_KEY);

  if (token && token.length)
    return token;
};

export const login = async ({ username, password }) => {
  try {
    const response = await HTTPService.post('/login', { username, password });
    setToken(response.data.token);
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
    clearToken();
  } catch(error) {
    throw 'Ocorreu um problema inesperado';
  }
}

