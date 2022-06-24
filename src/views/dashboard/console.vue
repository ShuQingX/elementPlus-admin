<template>
  <div>
    dashbord/console
    <el-button v-permission="{ action: 'delete', auths: $route.meta.permissions }">删除</el-button>
    <el-button v-permission="{ action: 'edit', auths: $route.meta.permissions }">编辑</el-button>
    <el-button v-permission="{ auths: $route.meta.permissions }">新增</el-button>
    <el-button v-permission="{ action: 'get', auths: $route.meta.permissions }">查看</el-button>
  </div>
</template>

<script setup lang="ts"></script>
