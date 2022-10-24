import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { createApp } from "vue";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

createApp(App).use(router).use(vuetify).mount("#app");
