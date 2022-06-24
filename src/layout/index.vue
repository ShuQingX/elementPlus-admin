<template>
  <el-container>
    <el-aside width="200px">
      <logo />
      <el-menu :default-active="$route.path" router>
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
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import asideMenu from './asideMenu.vue';
import logo from './logo.vue';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';

const asyncRouteStore = useAsyncRouteStore();

const menuList = asyncRouteStore.getMenuList;
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-menu {
  height: calc(100% - 64px);
  border-right: none;
}
</style>
