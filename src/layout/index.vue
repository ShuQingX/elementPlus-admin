<template>
  <el-container class="app-container">
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <Logo :is-collapse="isCollapse" />
      <el-menu
        :default-active="$route.fullPath"
        router
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
      >
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

    <!-- setting -->
    <el-drawer v-model="drawer" title="项目配置" size="25%" @close="closeDrawer">
      <GlobalSetting />
    </el-drawer>
  </el-container>
</template>

<script setup lang="ts">
import AsideMenu from './components/AsideMenu.vue';
import Logo from './components/Logo.vue';
import LayoutHeader from './components/Header.vue';
import GlobalSetting from './components/globalSetting/index.vue';

import { useAsyncRouteStroe } from '@/store/modules/asyncRoute';
import { useGlobalSettingStore } from '@/store/modules/globalSetting';
import { ref } from 'vue';
import { computed } from '@vue/reactivity';

const asyncRouteStore = useAsyncRouteStroe();
const globalSettingStore = useGlobalSettingStore();

//* 抽屉
const drawer = computed(() => globalSettingStore.getDrawerState);
const closeDrawer = globalSettingStore.toggleDrawer;

//* 菜单列表
const menuList = asyncRouteStore.getMenuList;

//* 菜单伸缩
const isCollapse = ref<boolean>(false);
const menuCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style lang="scss" scoped>
@import '@/styles/layout.scss';
</style>
