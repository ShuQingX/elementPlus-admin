<template>
  <el-container>
    <el-aside width="200px">
      <Logo />
      <el-menu :default-active="$route.path" router unique-opened>
        <el-scrollbar>
          <aside-menu v-for="item in menuList" :key="item.path" :menu-item="item"></aside-menu>
        </el-scrollbar>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AsideMenu from './components/AsideMenu.vue';
import Logo from './components/Logo.vue';

import { useAsyncRouteStroe } from '@/store/modules/asyncRoute';

const asyncRouteStore = useAsyncRouteStroe();

const menuList = asyncRouteStore.getMenuList;
</script>

<style lang="scss" scoped>
@import '@/styles/layout.scss';
</style>
