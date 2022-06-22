import { defineStore } from 'pinia';
import { loginUser } from '@/api/user';
import Storage from '@/utils/storage';
import { UserMutation } from '../mutation-types';

export interface IUserState {
  token: string;
  userInfo: Recordable | null;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => {
    return {
      token: Storage.get(UserMutation.ACCESS_TOKEN),
      userInfo: Storage.get(UserMutation.USER_INFO) || {}
    };
  },
  getters: {
    getToken(): string {
      return this.token;
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(info: Recordable) {
      this.userInfo = info;
    },
    async login(account: Recordable) {
      try {
        const result = await loginUser(account);
        const { data } = result;
        this.setToken(data.token);
        this.setUserInfo(data);

        Storage.set(UserMutation.ACCESS_TOKEN, data.token);
        Storage.set(UserMutation.USER_INFO, data);

        return Promise.resolve(result);
      } catch (e: any) {
        return Promise.reject(e);
      }
    }
  }
});
