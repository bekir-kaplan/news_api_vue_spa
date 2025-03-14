import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from './router';
import { useErrorStore } from '@/stores/errorStore';
import './styles/index.css';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);

app.config.errorHandler = (err: any) => {
  const errorStore = useErrorStore();
  errorStore.setError(err.message || 'An unknown error occurred');
};

app.mount('#app');
