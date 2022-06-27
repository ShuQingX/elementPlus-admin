import { createWebHistory, createRouter } from 'vue-router';
import { Layout, NotFound } from './base';
import { createRouteGuard } from './route-guard';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

// 获取异步路由
const modules = import.meta.globEager('./modules/**/*.ts');
const modulesRoutes: RouteRecordRaw[] = [];

Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {};
  modulesRoutes.push(...mod);
});

const loginRoute: RouteRecordRaw = { path: '/login', name: 'Login', component: () => import('@/views/login.vue') };

const rootRoute: RouteRecordRaw = { path: '/', name: 'Root', redirect: '/dashboard', component: Layout };

export const errorRoute: RouteRecordRaw = {
  path: '/pathMatch(.*)*',
  name: 'ErrorPage',
  component: Layout,
  children: [
    {
      path: '/pathMatch(.*)*',
      name: 'ErrorPageSon',
      component: NotFound
    }
  ]
};

export const asyncRoute = [...modulesRoutes];

const constants: RouteRecordRaw[] = [rootRoute, loginRoute];

export const router = createRouter({
  history: createWebHistory(),
  routes: constants
});

export function setupRouter(app: App) {
  app.use(router);

  createRouteGuard(router);
}
