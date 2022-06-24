import { createWebHistory, createRouter } from 'vue-router';
import { Layout, NotFound } from './base';
import { createRouteGuard } from './routeGuard';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

const loginRoute: RouteRecordRaw = { path: '/login', name: 'Login', component: () => import('@/views/login.vue') };

const rootRoute: RouteRecordRaw = { path: '/', name: 'root', redirect: '/dashboard', component: Layout };

export const ErrorPage: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'ErrorPage',
  component: Layout,
  meta: {
    title: 'ErrorPage'
  },
  children: [
    {
      path: '/:pathMatch(.*)*',
      name: 'ErrorPageSon',
      component: NotFound,
      meta: {
        title: 'ErrorPage'
      }
    }
  ]
};

const routes: RouteRecordRaw[] = [loginRoute, rootRoute];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouteGuard(router);
}
