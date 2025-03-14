import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import ViteImageOptimizer from './plugins/index'
// https://vite.dev/config/
export default defineConfig({
    base: 'https://your-cdn-domain.com/',
    plugins: [
        vue(),
        ViteImageOptimizer({
            // include: ['png'],
            quality: 100,
            enableDev: true,
            enableDevWebp: true,
            enableWebP: true,
        }),
    ],
    build: {
        assetsInlineLimit: 0,
    },
})
