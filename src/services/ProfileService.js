import EventEmitter from 'EventEmitter';

import HTTPService  from './HTTPService';

const ENDPOINT = '/profiles';
let __profile;

export default class ProfileService extends EventEmitter {

  setProfile = (profile) => {
    __profile = profile;
    this.emit('change', __profile);
  };

  static get = async () => {
    if (__profile)
      return __profile;

    try {
      const response = await HTTPService.get(ENDPOINT + '/my-profile');
      if (!response.data.phones)
        response.data.phones = [];

      this.setProfile(response.data);

      return __profile;
    } catch(error) {
      console.log(error.response);
      throw 'Ocorreu um problema inesperado';
    }
  };

};