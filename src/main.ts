import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.config.errorHandler = (err) => {
  /* 处理错误 */
  console.log("err: ", err);
};

app.mount("#app");
