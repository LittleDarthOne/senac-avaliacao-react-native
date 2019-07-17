import axios from 'axios';

import { getToken } from './AuthenticationService';

const axiosInstance = axios.create({
  baseURL: 'https://condo-manager-api-sample.herokuapp.com'
});

const getInstance = () => {
  axiosInstance.interceptors.request.use(async config => {
    const token = await getToken()
    if (token)
      config.headers.Authorization = 'Bearer ' + token;

    return config
  });

  return axiosInstance;
};

export default getInstance();