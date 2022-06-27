import { RouteRecordRaw } from 'vue-router';

export function filterRoute(routes: RouteRecordRaw[], permissions: any[], parent?: RouteRecordRaw) {
  return routes.map(route => {
    const currentRoute = {
      ...route,
      // 路径拼接成全路径，后续 el-menu 更方便使用
      path: parent ? `${parent.path}/${route.path}` : route.path,
      meta: {
        ...route.meta
      }
    };

    if (route.children && route.children.length) {
      currentRoute.children = filterRoute(route.children, permissions, currentRoute);
    }
    return currentRoute;
  });
}
