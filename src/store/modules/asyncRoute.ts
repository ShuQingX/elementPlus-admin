import { defineStore } from 'pinia';
import { asyncRoute } from '@/router';
import { useUserStore } from './user';
import { filterRoute } from '@/router/generotor-routes';
import { RouteRecordRaw } from 'vue-router';

interface IAsyncRouteState {
  isAddedRoute: boolean;
  menuList: RouteRecordRaw[];
}

export const useAsyncRouteStroe = defineStore({
  id: 'async-route',
  state: (): IAsyncRouteState => ({
    isAddedRoute: false,
    menuList: []
  }),
  getters: {
    getAddedRouteState(): boolean {
      return this.isAddedRoute;
    },
    getMenuList(): RouteRecordRaw[] {
      return this.menuList;
    }
  },
  actions: {
    setAddedRouteState(state: boolean) {
      this.isAddedRoute = state;
    },
    setMenuList(routes: RouteRecordRaw[]) {
      this.menuList = routes;
    },
    async generateRoutes() {
      const userStore = useUserStore();
      try {
        await userStore.userDetail();
        const routes = filterRoute(asyncRoute, userStore.permissions);
        this.setMenuList(routes);
        return Promise.resolve(routes);
      } catch (e) {
        console.warn('获取用户权限失败。');
        return Promise.reject(e);
      }
    }
  }
});
