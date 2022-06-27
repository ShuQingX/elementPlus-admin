import { useAsyncRouteStroe } from '@/store/modules/asyncRoute';
import { errorRoute } from '.';
import { Router } from 'vue-router';
import { useUserStore } from '@/store/modules/user';

// 路由 name 组成的白名单
const whiteList = ['Login'];

type RedirectType = { name: string; replace: boolean; query?: Recordable };

export function createRouteGuard(router: Router) {
  const asyncRouteStore = useAsyncRouteStroe();
  const userStore = useUserStore();

  // 路由 前置守卫
  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken;

    // 查看是否在白名单内
    if (whiteList.includes(to.name as string)) {
      // 登录后不允许回到登录页
      if (to.name === 'Login' && token) {
        next({ name: 'Root' });
        return;
      } else {
        next();
        return;
      }
    }

    // 查看是否有 token
    if (!token) {
      const redirectData: RedirectType = { name: 'Login', replace: true };
      if (to.path) {
        redirectData.query = { redirect: to.path };
      }
      next(redirectData);
      return;
    }

    // 挂载动态路由并保证挂载后不再重新挂载
    if (asyncRouteStore.getAddedRouteState) {
      next();
      return;
    }

    const routes = await asyncRouteStore.generateRoutes();
    if (routes && routes.length) {
      routes.forEach(item => {
        router.addRoute(item);
      });
    }
    router.addRoute(errorRoute);
    asyncRouteStore.setAddedRouteState(true);

    const redirectPath = (from.query.redirect || to.path) as string;
    const nextData = to.path === redirectPath ? { ...to, replace: true } : { path: redirectPath };
    next(nextData);
  });
}
