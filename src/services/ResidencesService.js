import HTTPService            from './HTTPService';

const __requestResidenceGroups = async () => {
  const response = await HTTPService.get('/residence-groups');
  return (response && response.data) || [];
};

const __requestResidences = async (residenceGroup) => {
  const response = await HTTPService.get(`/residence-groups/${residenceGroup.id}/residences`);
  return (response && response.data) || [];
};

export const getResidences = async () => {
  try {
    let result = [];

    const residenceGroups = await __requestResidenceGroups();
    for (const groupIndex in residenceGroups) {
      const residenceGroup = residenceGroups[groupIndex];

      const residences = await __requestResidences(residenceGroup);
      for (const residenceIndex in residences) {
        let residence = residences[residenceIndex];

        residence.residenceGroup = residenceGroup;
        result.push(residence);
      }
    }

    return result;
  } catch(error) {
    const { data } = error.response;
    console.log('GET RESIDENCES ERROR:', data);

    throw 'Ocorreu um problema inesperado';
  }
};