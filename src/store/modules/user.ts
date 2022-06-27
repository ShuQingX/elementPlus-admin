import { defineStore } from 'pinia';
import { get_user_info, loginUser } from '@/api/user';
import Storage from '@/utils/storage';
import { UserMutation } from '../mutation-types';

export interface IUserState {
  token: string;
  userInfo: Recordable;
  permissions: any[];
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => {
    return {
      token: Storage.get(UserMutation.ACCESS_TOKEN),
      userInfo: Storage.get(UserMutation.USER_INFO) || {},
      permissions: Storage.get(UserMutation.PERMISSIONS) || []
    };
  },
  getters: {
    getToken(): string {
      return this.token;
    },
    getUserInfo(): Recordable {
      return this.userInfo;
    },
    getPermisstions(): any[] {
      return this.permissions;
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(info: Recordable) {
      this.userInfo = info;
    },
    setPermissions(permissions: any[]) {
      this.permissions = permissions;
    },
    async login(account: Recordable) {
      try {
        const result = await loginUser(account);
        const { data } = result;
        this.setToken(data.token);

        Storage.set(UserMutation.ACCESS_TOKEN, data.token);

        return Promise.resolve(result);
      } catch (e: any) {
        return Promise.reject(e);
      }
    },
    async userDetail() {
      try {
        const result = await get_user_info();
        const { data } = result;
        this.setUserInfo(data);
        this.setPermissions(data.permissions);

        Storage.set(UserMutation.USER_INFO, data);
        Storage.set(UserMutation.PERMISSIONS, data.permissions);

        return Promise.resolve(data);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
});
