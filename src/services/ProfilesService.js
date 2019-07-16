import { AsyncStorage } from 'react-native';

const getMockupProfile = () => {
  return {
    name: 'Jeferson',
    cpf: '00969074018',
    email: 'jef.oli@gmail.com',
    phones: [
      { number: '(53) 98123-0929' },
      { number: '(53) 99940-9350' },
    ],
  };
};

const getStorageData = async () => {
  const stringfied = await AsyncStorage.getItem('profile');
  return stringfied && stringfied.length ? JSON.parse(stringfied) : [];
}

const setStorageData = async (profile) => {
  await AsyncStorage.setItem('profile', JSON.stringify(profile));
};

export const getProfile = async () => {
  let profile = await getStorageData();

  if (!profile.length) {
    profile = getMockupProfile();
    setStorageData(profile);
  }
  return profile;
};