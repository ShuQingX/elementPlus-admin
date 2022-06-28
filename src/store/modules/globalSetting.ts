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
    setDrawerState(state: boolean) {
      this.isShowDrawer = state;
    }
  }
});
