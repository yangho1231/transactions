import Vue from "vue";
import { apolloProvider } from "./boot/apollo";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import router from "./router";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueMaterial);

new Vue({
  router,
  render: (h) => h(App),
  apolloProvider,
}).$mount("#app");
