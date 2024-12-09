import { createApp } from 'vue';
import App from './App.vue';
import './style.scss';
import './tailwind.css';
import router from './router';
import './utils/request/index';
import Directives from '@/utils/directives/index';
import pinia from './stores';

const app = createApp(App);
app.use(Directives);
app.use(pinia);
app.use(router).mount('#app');
