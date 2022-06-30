<template>
  <div class="global-setting">
    <div class="mode">
      <el-divider> <h3>模式</h3> </el-divider>
      <Mode v-model="mode" @change="() => toggleDark()" />
    </div>
    <div class="theme-color">
      <el-divider> <h3>自定义主题颜色</h3> </el-divider>
      <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="colorPickerChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGlobalSettingStore } from '@/store/modules/globalSetting';
import { useDark, useToggle } from '@vueuse/core';
import Mode from './mode';

const globalSettingStore = useGlobalSettingStore();

//* 模式
const mode = ref(false || globalSettingStore.getThemeMode);
const isDark = useDark({ attribute: 'class', valueDark: 'dark', valueLight: 'light' });
const toggleDark = useToggle(isDark);

//* 主题颜色
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]);
const color = ref('');
const el = document.documentElement || '';
const colorPickerChange = (value: string) => {
  el && el.style.setProperty('--el-color-primary', value);
};
onMounted(() => {
  color.value = el && getComputedStyle(el).getPropertyValue(`--el-color-primary`);
});
</script>

<style lang="scss" scoped>
.global-setting {
  .mode {
    text-align: center;
  }
  .theme-color {
    text-align: center;
  }
}
</style>
