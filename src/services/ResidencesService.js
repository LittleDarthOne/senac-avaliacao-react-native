import { AsyncStorage } from 'react-native';

const getMockupList = () => {
  function getResidences(residenceGroup) {
    return [...Array(3)].map((item, index) => ({
      id: (residenceGroup.id * 10) + index,
      name: '10' + (index + 1), 
      description: 'Apartamento 10' + (index + 1),
      residenceGroup,
    }))
  }

  return [
    ...getResidences({id: 1, name: 'A', description: 'Bloco A',}),
    ...getResidences({id: 2, name: 'B', description: 'Bloco B',}),
    ...getResidences({id: 3, name: 'C', description: 'Bloco C',}),
  ];
};

const getStorageList = async () => {
  const stringfied = await AsyncStorage.getItem('residenceGroups');
  return stringfied && stringfied.length ? JSON.parse(stringfied) : [];
}

const setStorageList = async (residenceGroups) => {
  await AsyncStorage.setItem('residenceGroups', JSON.stringify(residenceGroups));
};

export const getResidences = async () => {
  let residenceGroups = await getStorageList();

  if (!residenceGroups.length) {
    residenceGroups = getMockupList();
    setStorageList(residenceGroups);
  }
  return residenceGroups;
};