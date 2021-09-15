import api from '@/services/api/index';

export default {
  install(Vue) {
    Vue.prototype.$api = api;
  },
};
