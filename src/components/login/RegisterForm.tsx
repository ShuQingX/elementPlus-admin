import { Phone, User, Lock } from '@element-plus/icons-vue';
import {
  ElButton,
  ElCheckbox,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRow,
  FormRules,
  ElMessage
} from 'element-plus';
import { defineComponent, onUnmounted, reactive, ref, watch } from 'vue';
import '@/styles/loginForm.scss';
import { registerUser } from '@/api/user';

export default defineComponent({
  name: 'RegisterForm',
  emits: ['backLogin'],
  setup(props, context) {
    const { emit } = context;

    const form = reactive({ username: '', phone: '', validateCode: '', password: '', secondPassword: '' });
    const formRules: FormRules = reactive({
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
      validateCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      secondPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    });
    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    const protocol = ref(false);
    const loading = ref(false);

    const register = () => {
      if (!protocol.value) {
        ElMessage({ type: 'warning', message: '请勾选协议', showClose: true });
        return;
      }
      formRef.value?.validate(async valid => {
        if (!valid) return;
        try {
          loading.value = true;
          await registerUser(form);
          ElMessage({ type: 'success', message: '注册用户成功，请登录。' });
          setTimeout(() => {
            emit('backLogin');
          }, 1000);
        } finally {
          loading.value = false;
        }
      });
    };

    const validateCodeInnerText = ref('获取验证码');
    const second = ref(60);
    let timerId: any = null;
    const getValidateCode = () => {
      timerId = setInterval(() => {
        second.value--;
      }, 1000);
    };

    watch(
      () => second.value,
      val => {
        validateCodeInnerText.value = `${val}s`;
        if (!val) {
          clearInterval(timerId);
          validateCodeInnerText.value = '获取验证码';
        }
      }
    );

    onUnmounted(() => {
      clearInterval(timerId);
    });

    return () => (
      <ElForm model={form} rules={formRules} ref={formRef} size="large" labelWidth={0}>
        <ElFormItem prop="username">
          <ElInput v-model={form.username} placeholder="请输入用户名" prefixIcon={User}></ElInput>
        </ElFormItem>
        <ElFormItem required class="validate-code__item">
          <ElRow>
            <ElCol span={14}>
              <ElFormItem prop="phone">
                <ElInput v-model={form.phone} placeholder="请输入手机号码" prefixIcon={Phone}></ElInput>
              </ElFormItem>
            </ElCol>
            <ElCol span={2}></ElCol>
            <ElCol span={8}>
              <ElButton
                onClick={getValidateCode}
                disabled={validateCodeInnerText.value !== '获取验证码' ? true : false}
              >
                {validateCodeInnerText.value}
              </ElButton>
            </ElCol>
          </ElRow>
        </ElFormItem>
        <ElFormItem prop="validateCode">
          <ElInput v-model={form.validateCode} placeholder="请输入验证码"></ElInput>
        </ElFormItem>
        <ElFormItem required>
          <ElRow>
            <ElCol span={11}>
              <ElFormItem prop="password">
                <ElInput
                  v-model={form.password}
                  placeholder="请输入密码"
                  showPassword
                  type="password"
                  prefixIcon={Lock}
                ></ElInput>
              </ElFormItem>
            </ElCol>
            <ElCol span={2}></ElCol>
            <ElCol span={11}>
              <ElFormItem prop="secondPassword">
                <ElInput
                  v-model={form.secondPassword}
                  placeholder="请输入密码"
                  showPassword
                  type="password"
                  prefixIcon={Lock}
                ></ElInput>
              </ElFormItem>
            </ElCol>
          </ElRow>
        </ElFormItem>
        <ElButton type="primary" onClick={register} loading={loading.value}>
          注册
        </ElButton>
        <div class="protocol">
          <ElCheckbox label="我同意隐私协议" v-model={protocol.value}></ElCheckbox>
          <ElLink type="primary" underline={false} onClick={() => emit('backLogin')}>
            返回登录
          </ElLink>
        </div>
      </ElForm>
    );
  }
});
