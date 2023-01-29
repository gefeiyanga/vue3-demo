import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "element-plus/theme-chalk/src/message-box.scss";
import "element-plus/theme-chalk/src/message.scss";

import "./assets/main.css";

const app = createApp(App);
app.use(router);

app.config.errorHandler = (err) => {
  /* 处理错误 */
  console.log("err: ", err);
};

app.mount("#app");
