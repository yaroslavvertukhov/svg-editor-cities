import axios from 'axios';

const axiosFactory = (authRequired = true) => {
  if (!authRequired) {
    return axios.create({
      baseURL: process.env.VUE_APP_API_URL_TEST,
    });
  }

  const token = localStorage.getItem('api-token'); // TODO:Переделать на Куки 🍪
  const headers = { Authorization: `Bearer ${token}` };

  return axios.create({
    baseURL: process.env.VUE_APP_API_URL_TEST,
    headers,
  });
};

export default axiosFactory;
