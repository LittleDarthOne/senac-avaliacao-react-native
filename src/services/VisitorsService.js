import { AsyncStorage } from 'react-native';

import Dates  from 'utils/Dates';

const getMockupList = () => {
  const now = new Date();
  return [
    {
      id: '1',
      creationDate: Dates.getDayBefore(now, 2),
      name: 'Visitante A',
      observation: 'Observações do visitante A',
    },
    {
      id: '2',
      creationDate: Dates.getDayBefore(now, 1),
      name: 'Visitante B',
      observation: 'Observações do visitante B',
    },
    {
      id: '3',
      creationDate: now,
      name: 'Visitante C',
      observation: 'Observações do visitante C',
    },
  ];
};

const getStorageList = async () => {
  const stringfied = await AsyncStorage.getItem('visitors');
  return stringfied && stringfied.length ? JSON.parse(stringfied) : [];
}

const setStorageList = async (visitors) => {
  await AsyncStorage.setItem('visitors', JSON.stringify(visitors));
};

export const getVisitors = async () => {
  let visitors = await getStorageList();

  if (!visitors.length) {
    visitors = getMockupList();
    setStorageList(visitors);
  }
  return visitors;
};