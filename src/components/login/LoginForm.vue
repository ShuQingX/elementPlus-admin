<template>
  <el-form :model="form" :rules="formRules" ref="formRef" label-width="0" size="large">
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" :prefix-icon="User"> </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" :prefix-icon="Lock">
      </el-input>
    </el-form-item>
    <el-form-item class="flex-between form-item-margin">
      <el-checkbox v-model="isAutoLogin" label="自动登录"></el-checkbox>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </el-form-item>
    <el-form-item class="form-item-margin">
      <el-button type="primary" size="large" @click="login" :loading="loading">登录</el-button>
    </el-form-item>
    <div class="ohter">
      <div class="other-login">
        <span>其他登录方式</span>
        <el-link :underline="false"></el-link>
        <el-link :underline="false"></el-link>
      </div>
      <el-link type="primary" :underline="false" @click="$emit('register')">注册账号</el-link>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { ElForm, ElMessage, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';

defineEmits(['register']);

const router = useRouter();
const userStore = useUserStore();

const form = reactive({ username: 'admin', password: '1' });
const formRules: FormRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});
const formRef = ref<null | InstanceType<typeof ElForm>>(null);

const isAutoLogin = ref(false);
const loading = ref(false);

const login = () => {
  formRef.value?.validate(async valid => {
    if (!valid) return;
    try {
      loading.value = true;
      const result = await userStore.login(form);
      if (result.code === 200) {
        ElMessage({ type: 'success', message: '登录成功，即将进入系统', showClose: true });
        setTimeout(() => {
          router.replace('/');
        }, 1000);
      } else {
        ElMessage({ type: 'error', message: '登录失败', showClose: true });
      }
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style lang="scss" scoped>
@import '@/styles/loginForm.scss';

.form-item-margin {
  margin-bottom: 10px;
}
.ohter {
  display: flex;
  justify-content: space-between;
}
</style>
