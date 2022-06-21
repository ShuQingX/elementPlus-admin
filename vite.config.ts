import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';

const resolve = dir => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsxPlugin()],
  resolve: {
    alias: {
      '@': resolve('src')
    },
    extensions: ['.ts', '.tsx', '.vue']
  }
});
