import VueYouTubeEmbed from 'vue-youtube-embed'
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueYouTubeEmbed)

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
