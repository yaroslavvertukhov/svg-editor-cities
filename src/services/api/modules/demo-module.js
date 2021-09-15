import axiosFactory from '@/services/api/axios-factory';

export default {
  login: (payload) =>
    axiosFactory(false).post(`/login`, {
      ...payload,
    }),
  getUser: () => axiosFactory().get('/user/auth-user'),
};
