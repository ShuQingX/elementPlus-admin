<template>
  <el-header>
    <div class="header-left">
      <el-icon @click="$emit('menuCollapse')"><Operation /></el-icon>
    </div>
    <div class="header-right">
      <Icon icon="icon-fullscreen"></Icon>
      <Icon icon="icon-tongzhiNotice"></Icon>
      <el-avatar :size="40"></el-avatar>
      <Icon icon="icon-setting"></Icon>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import Icon from '@/components/common/Icon';

defineEmits(['menuCollapse']);
</script>
