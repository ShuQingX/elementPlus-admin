<template>
  <template v-if="menuItem.children?.length && !menuItem.meta?.hidden">
    <el-sub-menu :index="menuItem.path">
      <template #title>
        <el-icon><ElementPlus /></el-icon>
        <!-- <i class="el-icon-location"></i> -->
        <span>{{ menuItem.meta!.title }}</span>
      </template>
      <aside-menu v-for="item in menuItem.children" :key="item.path" :menu-item="item"></aside-menu>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="menuItem.path" :route="menuItem" v-if="!menuItem.meta?.hidden">
      {{ menuItem.meta!.title }}
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router';
import asideMenu from './asideMenu.vue';

defineProps<{ menuItem: RouteRecordRaw }>();
</script>
