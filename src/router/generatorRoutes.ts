import { getMenus } from '@/api/user';
import { RouteRecordRaw } from 'vue-router';
import { ParentLayout, Layout } from '@/router/base';

enum layoutEnum {
  PARENTLAYOUT = 'PARENTLAYOUT',
  LAYOUT = 'LAYOUT'
}
const layoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();

layoutMap.set(layoutEnum.LAYOUT, Layout);
layoutMap.set(layoutEnum.PARENTLAYOUT, ParentLayout);

const permission: string[] = [];

/**
 * @description 根据后端返回路由表生成动态菜单以及路由
 */
export async function generateDynamicRoutes() {
  try {
    const { data } = await getMenus();
    const routes = generatorRouter(data);
    dynamicImportRoute(routes);

    return Promise.resolve({ routes, permission });
  } catch (e) {
    return Promise.reject(e);
  }
}

// 根据后端路由表生成路由
function generatorRouter(routeMap: Partial<RouteRecordRaw>[], parent?: Partial<RouteRecordRaw>) {
  return routeMap.map(route => {
    const currentRoute: Partial<RouteRecordRaw> = {
      path: parent ? `${parent.path}/${route.path}` : route.path,
      name: route.name || '',
      component: route.component,
      meta: {
        ...route.meta
      }
    };
    if (route.meta && route.meta.permissions) {
      permission.push(...(route.meta.permissions as string));
    }
    // 重定向
    if (route.redirect) {
      currentRoute.redirect = route.redirect;
    }
    // 递归
    if (route.children && route.children.length) {
      currentRoute.children = generatorRouter(route.children, currentRoute) as RouteRecordRaw[];
    }
    return currentRoute;
  });
}
// 根据后端路由表信息动态导入路由
function dynamicImportRoute(routeMap: any[]) {
  const viewsModules = import.meta.glob('../views/**/*.{vue,jsx}');
  routeMap.forEach(item => {
    if (item.component) {
      if (item.component === layoutEnum.LAYOUT) {
        item.component = layoutMap.get(layoutEnum.LAYOUT);
      } else {
        // 导入组件
        item.component = dynamicImport(viewsModules, item.component);
      }
    } else if (item.name) {
      item.component = layoutMap.get(layoutEnum.PARENTLAYOUT);
    }
    // 递归把component全部变成真实的组件导入
    item.children && dynamicImportRoute(item.children);
  });
}

function dynamicImport(viewsModules: Record<string, () => Promise<Recordable>>, component: string) {
  let viewsModulesComponent;
  Object.keys(viewsModules).forEach(item => {
    if (item.includes(component)) {
      viewsModulesComponent = viewsModules[item];
    }
  });
  return viewsModulesComponent && viewsModulesComponent;
}
