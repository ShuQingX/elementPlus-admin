import { generateDynamicRoutes } from '@/router/generatorRoutes';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

export interface IAsyncRouteState {
  menuList: RouteRecordRaw[];
  isAddedRouteState: boolean; // 是否已经添加过动态路由
  permission: string[];
}

export const useAsyncRouteStore = defineStore({
  id: 'async-route',
  state: (): IAsyncRouteState => ({
    menuList: [],
    isAddedRouteState: false,
    permission: []
  }),
  getters: {
    getAddedRouteState(): boolean {
      return this.isAddedRouteState;
    },
    getMenuList(): RouteRecordRaw[] {
      return this.menuList;
    },
    getPermisstion(): string[] {
      return this.permission;
    }
  },
  actions: {
    setMenu(menu: RouteRecordRaw[]) {
      this.menuList = menu;
    },
    setAddedRouteState(state: boolean) {
      this.isAddedRouteState = state;
    },
    setPermisstion(permission: string[]) {
      this.permission = permission;
    },
    // 后端获取路由
    async generateRoute(): Promise<RouteRecordRaw[]> {
      try {
        const { routes, permission } = await generateDynamicRoutes();
        this.setMenu(routes as RouteRecordRaw[]);
        this.setPermisstion(permission);

        return Promise.resolve(routes as RouteRecordRaw[]);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
});
