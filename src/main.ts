<<<<<<< HEAD
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VMoney from 'v-money3';
import PrimeVue from 'primevue/config';
import '@primevue/themes/aura';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createApp(App)
    .use(router)
    .use(VMoney)
    .use(PrimeVue)
    .mount('#app');
=======
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';


createApp(App).use(router).mount('#app')
>>>>>>> 9d18a7fd13ffe27c5a839c106ae9575fef5478da
