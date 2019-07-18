import EventEmitter from 'EventEmitter';

import HTTPService            from './HTTPService';
import { addLogoutListener }  from './AuthenticationService';

const ENDPOINT       = '/profiles';
const __eventEmitter = new EventEmitter();
let   __profile;

const __setProfile   = (profile) => {
    if (profile && !profile.phones)
      profile.phones = [];
    if (profile && !profile.phones.length)
      profile.phones.push({});

  __profile = profile;
  __eventEmitter.emit('save', __profile);
};

addLogoutListener(() => __setProfile(undefined));

export const getProfile = async () => {
  if (__profile)
    return __profile;

  try {
    const response = await HTTPService.get(ENDPOINT + '/my-profile');
    __setProfile(response.data);

    return __profile;
  } catch(error) {
    console.log(error.response);
    throw 'Ocorreu um problema inesperado';
  }
};

export const saveProfile = async (profile) => {
  try {
    if (profile.phones)
      profile.phones = profile.phones.filter(phone => !!phone.number);

    const response = await HTTPService.put(ENDPOINT + '/my-profile', profile);
    console.log('SAVED:', response.data);
    __setProfile(response.data);

    return __profile;
  } catch(error) {
    const { data } = error.response;
    console.log('ERROR:', data);
    throw 'Ocorreu um problema inesperado';
  }
};

export const addProfileSaveListener = (listener) => {
  return __eventEmitter.addListener('save', listener);
};