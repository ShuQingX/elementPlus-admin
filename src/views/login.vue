<template>
  <div class="login-page">
    <div class="login-warrper">
      <div class="login-pic">
        <img src="@/assets/images/login.png" alt="login-pic" />
      </div>
      <div class="login-form">
        <div class="login-top">
          <img src="@/assets/images/logo.png" alt="logo" />
          <span>ElementPlus Admin</span>
        </div>
        <p class="login-top__desc">Element plus 中后台前端/设计解决方案</p>

        <template v-if="!isRegsiter">
          <login-form @register="isRegsiter = !isRegsiter"></login-form>
        </template>
        <template v-else>
          <register-form @back-login="isRegsiter = !isRegsiter"></register-form>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/login/LoginForm.vue';
import RegisterForm from '@/components/login/RegisterForm';
import { ref } from 'vue';

const isRegsiter = ref(false);
</script>

<style lang="scss" scoped>
.login-page {
  min-width: 480px;
  height: 100%;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
  position: relative;
  .login-warrper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 960px;
    height: 520px;
    padding: 30px 90px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    align-items: center;
    display: flex;
    justify-content: space-between;
    .login-form {
      margin: auto 30px;
      width: 350px;
      .login-top {
        margin-bottom: 10px;
        font-size: 24px;
        text-align: center;
        img {
          width: 45px;
          height: 45px;
          vertical-align: bottom;
        }
        span {
          background: linear-gradient(92.06deg, #33c2ff -17.9%, #1e6fff 43.39%, #1e6fff 99.4%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 500;
          margin-left: 10px;
          line-height: 40px;
        }
      }
      .login-top__desc {
        margin-bottom: 20px;
        text-align: center;
        color: #808695;
        font-size: 14px;
      }
    }
  }
}

@media (max-width: 960px) {
  .login-page {
    .login-warrper {
      display: flex;
      align-items: center;
      width: calc(100% - 40px);
      height: auto;
      padding: 50px 90px;
      .login-pic {
        display: none;
      }
      .login-form {
        width: 100%;
      }
    }
  }
}
@media (max-width: 640px) {
  .login-page {
    .login-warrper {
      padding: 30px 40px;
      height: auto;
    }
  }
}
</style>
