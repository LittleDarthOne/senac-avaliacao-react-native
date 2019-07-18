import { AsyncStorage } from 'react-native';

import { getProfile }   from './ProfileService';

import Dates  from 'utils/Dates';

AsyncStorage.removeItem('visitors');

const visitorsList = [
  {
    id: '1',
    creationDate: Dates.getDayBefore(new Date(), 2),
    name: 'Visitante A',
    observation: 'Observações do visitante A',
  },
  {
    id: '2',
    creationDate: Dates.getDayBefore(new Date(), 1),
    name: 'Visitante B',
    observation: 'Observações do visitante B',
  },
  {
    id: '3',
    creationDate: new Date(),
    name: 'Visitante C',
    observation: 'Observações do visitante C',
  },
];

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
    visitors = visitorsList;
    setStorageList(visitors);
  }
  return visitors;
};

export const addVisitor = async (visitor) => {
  let visitors = await getVisitors();

  visitor.creationDate  = new Date();
  visitor.authorizeDate = visitor.creationDate;
  visitor.author        = getProfile();
  visitor.residence     = visitor.author.residence;
  visitor.id = visitors.length + 1;

  visitors.push(visitor);
  await setStorageList(visitors);
};