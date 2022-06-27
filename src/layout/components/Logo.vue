<template>
  <div class="logo" @click="$router.push('/')">
    <img src="@/assets/images/logo.png" alt="logo" />
    <h1 v-show="!isCollapse">ElementPlusAdmin</h1>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ isCollapse: boolean }>();
</script>
