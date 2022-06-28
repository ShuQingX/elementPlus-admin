<template>
  <div class="global-setting">
    <div class="mode">
      <el-divider> <h3>模式</h3> </el-divider>
      <Mode v-model="mode" @change="() => toggleDark()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import Mode from './mode';

const mode = ref(false);

const isDark = useDark({ attribute: 'class', valueDark: 'dark', valueLight: 'light' });
const toggleDark = useToggle(isDark);
</script>

<style lang="scss" scoped>
.global-setting {
  .mode {
    text-align: center;
  }
}
</style>
