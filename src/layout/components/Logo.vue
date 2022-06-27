<template>
  <div class="logo" @click="$router.push('/')">
    <img src="@/assets/images/logo.png" alt="logo" />
    <h1>ElementPlusAdmin</h1>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  line-height: 64px;
  background-color: #fff;
  cursor: pointer;
  img {
    width: 32px;
    height: 32px;
    margin-top: 14px;
    margin-right: 4px;
  }
}
</style>
