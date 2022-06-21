<template>
  <RouterLink to="/">home</RouterLink> |
  <RouterLink to="/about">about</RouterLink>
  <RouterView></RouterView>
</template>

<script setup lang="ts"></script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
