import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/home/HomeView.vue';
import LogInView from '@/views/login/LogInView.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  { path: '/login', component: LogInView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
