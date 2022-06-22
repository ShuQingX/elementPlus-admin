import { createApp } from 'vue';
import { router, setupRouter } from '@/router';
import { setupStore } from '@/store';
import { setupElementPlusIcon } from '@/plugins/elementPlus';
import App from './App.vue';
import '@/styles/index.scss';

async function bootstrap() {
  const app = createApp(App);

  // 挂载 store
  setupStore(app);

  // 挂载 router
  setupRouter(app);

  // 等待 router 挂载成功，再挂载应用。
  await router.isReady();

  setupElementPlusIcon(app);

  app.mount('#app');
}

void bootstrap();
