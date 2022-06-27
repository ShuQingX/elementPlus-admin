<template>
  <template v-if="menuItem.children?.length">
    <el-sub-menu :index="menuItem.path">
      <template #title>
        <Icon v-if="menuItem.meta?.icon" :icon="menuItem.meta?.icon" size="30" />
        <span>{{ menuItem.meta?.title }}</span>
      </template>
      <aside-menu v-for="item in menuItem.children" :key="item.path" :menu-item="item"></aside-menu>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="menuItem.path" :route="menuItem">
      <Icon v-if="menuItem.meta?.icon" :icon="menuItem.meta?.icon" size="30" />
      <span>{{ menuItem.meta?.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import asideMenu from './AsideMenu.vue';
import Icon from '@/components/common/Icon.tsx';
import type { RouteRecordRaw } from 'vue-router';

defineProps<{ menuItem: RouteRecordRaw }>();
</script>
