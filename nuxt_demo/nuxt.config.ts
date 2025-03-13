// https://nuxt.com/docs/api/configuration/nuxt-config
console.log(process.env.NODE_ENV)

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@pinia/nuxt'],
    // 关键配置
    nitro: {
        prerender: {
            crawlLinks: true, // 自动爬取链接生成静态页
            routes: [], // 强制预渲染的路由（可选）
        },
    },
    // 静态资源路径配置（可选）
    app: {
        buildAssetsDir: '/_nuxt/', // 匹配 CDN 路径
    },
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
            assetsDir: '_nuxt', // 确保构建目录与CDN路径匹配
        },
    },
})
