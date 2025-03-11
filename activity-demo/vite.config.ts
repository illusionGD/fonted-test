import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import ImageOptimizer from './plugins/imageOptimizer'
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        ImageOptimizer({
            quality: 90
        }),
    ],
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@/assets/css/global.scss" as *;',
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
})
