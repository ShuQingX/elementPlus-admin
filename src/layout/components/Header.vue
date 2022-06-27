<template>
  <el-header>
    <div class="header-left">
      <el-icon @click="$emit('menuCollapse')"><Operation /></el-icon>
    </div>
    <div class="header-right">
      <Icon :icon="isScreen ? 'icon-fullscreen-exit' : ' icon-fullscreen'" @click="screen"></Icon>
      <Icon icon="icon-tongzhiNotice"></Icon>
      <el-dropdown @command="dropdownCommand">
        <el-avatar :size="40" :src="avatarUrl"></el-avatar>
        <template #dropdown>
          <el-dropdown-item v-for="item in dropdownMenu" :key="item.icon" :command="item.command">
            <Icon :icon="item.icon" />
            <span>{{ item.title }}</span>
          </el-dropdown-item>
        </template>
      </el-dropdown>
      <Icon icon="icon-setting"></Icon>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import Icon from '@/components/common/Icon';
import { ElMessage } from 'element-plus';
import screenfull from 'screenfull';
import { reactive, ref, useSlots } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { useRouter } from 'vue-router';

defineEmits(['menuCollapse']);

const userStore = useUserStore();
const router = useRouter();

const avatarUrl = userStore.getAvatar;

const dropdownMenu = reactive([
  { icon: 'icon-qiehuanyonghu', title: '个人设置', command: 'setting' },
  { icon: 'icon-xiugaimima', title: '修改密码', command: 'changePassword' },
  { icon: 'icon-tuichudenglu', title: '退出登录', command: 'logout' }
]);
const dropdownCommand = async (command: string) => {
  switch (command) {
    case 'setting':
      ElMessage({ type: 'warning', message: '暂未实现。。。', showClose: true });
      break;
    case 'changePassword':
      ElMessage({ type: 'warning', message: '暂未实现。。。', showClose: true });
      break;
    case 'logout':
      await userStore.logout();
      router.replace({ name: 'Login' });
      break;
  }
};

const isScreen = ref(screenfull.isFullscreen);
const screen = async () => {
  if (screenfull.isEnabled) {
    if (!screenfull.isFullscreen) {
      screenfull.request();
      isScreen.value = true;
    } else {
      screenfull.exit();
      isScreen.value = false;
    }
  }
};
</script>
