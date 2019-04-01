import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import "material-design-lite/dist/material.indigo-red.min.css";
import "material-design-lite/material.min.js";
import "dialog-polyfill/dialog-polyfill.css";
// import 'dialog-polyfill/dialog-polyfill.js'

Vue.config.productionTip = false;
Vue.prototype.$request = axios.create({
  baseURL: "https://weibo-sentiment.zengxingfu.com/api/"
  // baseURL: 'http://localhost/api/'
});
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$global = {};

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
