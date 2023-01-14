import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import router from './router/index'
import store from './store';
import axios from 'axios';

const app = createApp(App);
app.use(router).mount('#app')
app.use(store);