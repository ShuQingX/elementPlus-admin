import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

const loginRoute: RouteRecordRaw = { path: '/login', name: 'Login', component: () => import('@/views/login.vue') };

const routes: RouteRecordRaw[] = [loginRoute];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

export function setupRouter(app: App) {
  app.use(router);
}
