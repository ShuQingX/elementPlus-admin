import { defineStore } from 'pinia';
import { useDark, useToggle } from '@vueuse/core';
import type { WritableComputedRef } from 'vue';

export interface IGlobalSetting {
  isShowDrawer: boolean;
  isDark: WritableComputedRef<boolean> | unknown;
}

export const useGlobalSettingStore = defineStore({
  id: 'global-setting',
  state: (): IGlobalSetting => ({
    isShowDrawer: false,
    isDark: null
  }),
  getters: {
    getDrawerState(): boolean {
      return this.isShowDrawer;
    },
    getThemeMode(): boolean {
      return this.isDark as boolean;
    }
  },
  actions: {
    setDrawerState(state: boolean) {
      this.isShowDrawer = state;
    },
    setThemeMode() {
      this.isDark = useDark({ attribute: 'class', valueDark: 'dark', valueLight: 'light' });
    }
  }
});
