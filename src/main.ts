import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import axios from 'axios';

// Interceptação para adicionar o token nas requisições
// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

createApp(App).use(router).mount('#app');
