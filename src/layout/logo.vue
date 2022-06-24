<template>
  <div class="logo" @click="$router.push('/')">
    <img src="@/assets/logo.png" alt="logo" />
    <h1>ElementPlusAdmin</h1>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 64px;
  background-color: #fff;
  cursor: pointer;
  img {
    width: 32px;
    height: 32px;
    margin-right: 6px;
  }
}
</style>
