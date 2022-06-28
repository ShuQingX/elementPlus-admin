import { defineStore } from 'pinia';

export interface IGlobalSetting {
  isShowDrawer: boolean;
}

export const useGlobalSettingStore = defineStore({
  id: 'global-setting',
  state: (): IGlobalSetting => ({
    isShowDrawer: false
  }),
  getters: {
    getDrawerState(): boolean {
      return this.isShowDrawer;
    }
  },
  actions: {
    toggleDrawer() {
      this.isShowDrawer = !this.isShowDrawer;
    }
  }
});
