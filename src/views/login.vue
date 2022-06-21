<template>
  <div class="login-page">login</div>
</template>

<script setup lang="ts">
import { http } from '@/utils/http';

http.request({ method: 'post', url: '/login' }).then(res => {
  console.log(res);
});
</script>

<style lang="scss" scoped>
.login-page {
  min-width: 768px;
}
</style>
