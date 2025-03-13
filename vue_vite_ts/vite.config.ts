import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import ViteImageOptimizer from './plugins/index'
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        ViteImageOptimizer({
            // include: ['png'],
            quality: 80,
            enableDev: true,
            enableDevWebp: true,
        }),
    ],
})
