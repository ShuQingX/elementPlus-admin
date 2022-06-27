import { defineStore } from 'pinia';
import { get_user_info, loginUser, logoutUser } from '@/api/user';
import Storage from '@/utils/storage';
import { UserMutation } from '../mutation-types';

export interface IUserState {
  token: string;
  userInfo: Recordable;
  permissions: any[];
  avatar: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => {
    return {
      token: Storage.get(UserMutation.ACCESS_TOKEN),
      userInfo: Storage.get(UserMutation.USER_INFO) || {},
      permissions: Storage.get(UserMutation.PERMISSIONS) || [],
      avatar: Storage.get(UserMutation.AVATAR)
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
    },
    getAvatar(): string {
      return this.avatar;
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
    setAvatar(avatar: string) {
      this.avatar = avatar;
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
        this.setAvatar(data.avatar);

        Storage.set(UserMutation.USER_INFO, data);
        Storage.set(UserMutation.PERMISSIONS, data.permissions);
        Storage.set(UserMutation.AVATAR, data.avatar);

        return Promise.resolve(data);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async logout() {
      try {
        const result = await logoutUser();

        this.setToken('');
        this.setPermissions([]);
        this.setUserInfo({});
        this.setAvatar('');

        Storage.remove(UserMutation.ACCESS_TOKEN);
        Storage.remove(UserMutation.PERMISSIONS);
        Storage.remove(UserMutation.USER_INFO);
        Storage.remove(UserMutation.AVATAR);

        return Promise.resolve(result);
      } catch (e: any) {
        console.warn('退出登录失败，请检查接口是否正常');
        return Promise.reject(e);
      }
    }
  }
});
