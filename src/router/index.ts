import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

const routes: RouteRecordRaw[] = [];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

export function setupRouter(app: App) {
  app.use(router);
}
