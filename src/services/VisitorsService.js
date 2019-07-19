import HTTPService    from './HTTPService';

const ENDPOINT = '/visitors/my-visitors';

const __persistVisitor = async (visitor) => {
  const operation = visitor.id ? HTTPService.put : HTTPService.post;
  const url       = ENDPOINT + (visitor.id ? ('/' + visitor.id) : '');

  console.log(url);
  return await operation(url, visitor);
};

export const getVisitors = async () => {
  try {
    const response = await HTTPService.get(ENDPOINT);
    return (response && response.data) || [];
  } catch(error) {
    const { data } = error.response;
    console.log('GET VISITORS ERROR:', data);

    if (data.message.includes('inform your residence'))
      throw 'Para começar a listar seus visitantes, informe sua residência no seu perfil';
    else
      throw 'Ocorreu um problema inesperado';
  }
};

export const saveVisitor = async (data) => {
  try {
    const visitor   = {...data};
    const response  = await __persistVisitor(visitor);
    return response.data;
  } catch(error) {
    const { data } = error.response;
    console.log('SAVE VISITOR ERROR:', data);

    if (data.message.includes('must be informed'))
      throw 'O nome nome do visitante é obrigatório e não pode ficar em branco';
    else if (data.message.includes('inform your residence'))
      throw 'Para começar a registrar seus visitantes, informe sua residência no seu perfil';
    else
      throw 'Ocorreu um problema inesperado';
  }
};

export const deleteVisitor = async (data) => {
  try {
    const response = await HTTPService.delete(ENDPOINT + '/' + data.id);
  } catch(error) {
    const { data } = error.response;
    console.log('DELETE VISITOR ERROR:', data);

    throw 'Ocorreu um problema inesperado';
  }
};