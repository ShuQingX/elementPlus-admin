import { createApp } from 'vue';
import { router, setupRouter } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue';

async function bootstrap() {
  const app = createApp(App);

  // 挂载 store
  setupStore(app);

  // 挂载 router
  setupRouter(app);

  // 等待 router 挂载成功，再挂载应用。
  await router.isReady();

  app.mount('#app');
}

void bootstrap();
