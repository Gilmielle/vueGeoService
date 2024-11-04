import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './app/App.vue'
import './app/styles/main.css'
import OpenLayersMap from 'vue3-openlayers';
import 'vue3-openlayers/dist/vue3-openlayers.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(OpenLayersMap).mount("#app");
