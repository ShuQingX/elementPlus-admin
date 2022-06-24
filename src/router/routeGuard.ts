import Storage from '@/utils/storage';
import type { Router } from 'vue-router';
import { UserMutation } from '@/store/mutation-types';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { ErrorPage } from './index';

enum PageEnum {
  LOGIN_PATH = '/login',
  LOGIN_NAME = 'Login',
  HOME_PATH = '/dasboard'
}

const whiteList = [PageEnum.LOGIN_PATH];

export function createRouteGuard(router: Router) {
  const asyncRouteStore = useAsyncRouteStore();

  router.beforeEach(async (to, from, next) => {
    // 来自白名单 放行
    if (whiteList.includes(to.path as PageEnum)) {
      next();
      return;
    }

    // 没有 token 回退到登录页
    const token = Storage.get(UserMutation.ACCESS_TOKEN);
    if (!token) {
      const redirectPath = { path: PageEnum.LOGIN_PATH, query: { redirect: to.path } };
      next(redirectPath);
      return;
    }

    // 添加过动态路由就不用再添加了
    if (asyncRouteStore.getAddedRouteState) {
      next();
      return;
    }

    // 添加动态路由
    const routes = await asyncRouteStore.generateRoute();
    routes.forEach(route => {
      router.addRoute(route);
    });

    // 添加404路由
    router.addRoute(ErrorPage);
    asyncRouteStore.setAddedRouteState(true);

    const redirectData = (from.query.redirect || to.path) as string;
    const nextData = to.path === redirectData ? { ...to, replace: true } : { path: redirectData };
    next(nextData);
  });
}
