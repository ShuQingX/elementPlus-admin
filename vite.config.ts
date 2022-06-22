import path from 'path';
import { UserConfigExport, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
// import Icons from 'unplugin-icons/vite';
// import IconsResolver from 'unplugin-icons/resolver';

import { viteMockServe } from 'vite-plugin-mock';

const resolve = dir => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      vueJsxPlugin(),
      // elementPlus 自动导入
      AutoImport({
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver()
          // 自动导入图标组件
          // IconsResolver({
          //   prefix: 'Icon'
          // })
        ]
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
          // 自动注册图标组件
          // IconsResolver({
          //   enabledCollections: ['ep']
          // })
        ]
      }),
      // Icons({
      //   autoInstall: true
      // }),
      // elementPlus 样式导入
      ElementPlus(),
      // mock
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve'
      })
    ],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    server: {
      proxy: {
        '^/api/.*': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  };
};
