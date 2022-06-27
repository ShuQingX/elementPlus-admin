import { useAsyncRouteStroe } from '@/store/modules/asyncRoute';
import { errorRoute } from '.';
import { Router } from 'vue-router';

export function createRouteGuard(router: Router) {
  const asyncRouteStore = useAsyncRouteStroe();

  // 路由 前置守卫
  router.beforeEach(async (to, from, next) => {
    // 如果动态路由已经添加过就不在执行
    if (asyncRouteStore.getAddedRouteState) {
      next();
      return;
    }
    // 挂载动态路由
    const routes = await asyncRouteStore.generateRoutes();
    if (routes && routes.length) {
      routes.forEach(item => {
        router.addRoute(item);
      });
    }
    router.addRoute(errorRoute);
    asyncRouteStore.setAddedRouteState(true);

    next({ ...to, replace: true });
  });
}
