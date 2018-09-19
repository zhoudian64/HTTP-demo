import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import forge from 'node-forge';
import os from 'os';
import fs from 'fs';

Vue.use(ElementUI);
if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.prototype.$http = axios;
Vue.prototype.$os = os;
Vue.prototype.$fs = fs;
Vue.prototype.$forge = forge;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
