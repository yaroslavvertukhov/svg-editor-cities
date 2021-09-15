import Vue from 'vue';
import api from './plugins/api';
import App from './app.vue';
import router from './router';
import store from './store';

Vue.use(api);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
