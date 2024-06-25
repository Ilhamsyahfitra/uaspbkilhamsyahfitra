import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { Quasar, Notify } from 'quasar';
import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Quasar, {
  plugins: { Notify },
  config: {
    notify: { /* look at QuasarConfOptions from the API card */ }
  }
});

app.mount('#app');
