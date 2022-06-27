<template>
  <el-container class="app-container">
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <Logo :is-collapse="isCollapse" />
      <el-menu :default-active="$route.path" router unique-opened :collapse="isCollapse" :collapse-transition="false">
        <el-scrollbar>
          <aside-menu v-for="item in menuList" :key="item.path" :menu-item="item"></aside-menu>
        </el-scrollbar>
      </el-menu>
    </el-aside>
    <el-container class="main-container">
      <LayoutHeader @menu-collapse="menuCollapse"></LayoutHeader>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AsideMenu from './components/AsideMenu.vue';
import Logo from './components/Logo.vue';
import LayoutHeader from './components/Header.vue';

import { useAsyncRouteStroe } from '@/store/modules/asyncRoute';
import { ref } from 'vue';

const asyncRouteStore = useAsyncRouteStroe();

const menuList = asyncRouteStore.getMenuList;
const isCollapse = ref<boolean>(false);

const menuCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style lang="scss" scoped>
@import '@/styles/layout.scss';
</style>
