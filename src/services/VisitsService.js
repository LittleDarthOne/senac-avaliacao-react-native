import { AsyncStorage } from 'react-native';

import Dates  from 'utils/Dates';

const getMockupList = () => {
  const now = new Date();
  return [
    {
      id: '1',
      createDate: Dates.getDayBefore(now, 2),
      denyDate: undefined,
      authorizeDate: undefined,
      visitor: { name: 'Visitante A' },
      author: { name: 'Porteiro A' }
    },
    {
      id: '2',
      createDate: Dates.getDayBefore(now, 1),
      denyDate: Dates.getDayBefore(now, 1),
      authorizeDate: undefined,
      visitor: { name: 'Visitante B' },
      author: { name: 'Porteiro A' }
    },
    {
      id: '3',
      createDate: now,
      denyDate: undefined,
      authorizeDate: now,
      visitor: { name: 'Visitante C' },
      author: { name: 'Porteiro B' }
    },
  ];
};

const getStorageList = async () => {
  const stringfied = await AsyncStorage.getItem('visits');
  return stringfied && stringfied.length ? JSON.parse(stringfied) : [];
}

const setStorageList = async (visits) => {
  await AsyncStorage.setItem('visits', JSON.stringify(visits));
};

export const getVisits = async () => {
  let visits = await getStorageList();

  if (!visits.length) {
    visits = getMockupList();
    setStorageList(visits);
  }
  return visits;
};