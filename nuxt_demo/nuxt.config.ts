// https://nuxt.com/docs/api/configuration/nuxt-config
console.log(process.env.NODE_ENV)

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@pinia/nuxt'],
    vite: {
        base:
            process.env.NODE_ENV === 'production'
                ? 'https://igamebuy-hk-cdn.oss-cn-hongkong.aliyuncs.com/activity/events/2025-spring/'
                : '/_nuxt/',
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/global.scss";',
                },
            },
        },
        build: {
            assetsDir: '_nuxt' // 确保构建目录与CDN路径匹配
        }
    },
})
