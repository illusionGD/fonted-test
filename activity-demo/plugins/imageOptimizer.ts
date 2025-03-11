import type { Plugin, ResolvedConfig } from 'vite'
import path from 'path'
import { pressDirImage } from './press'
import { IMG_FORMATS } from './constants'
import { cwd } from 'process'

export interface PluginOptions {
    /** 质量：1-100 */
    quality: number
    /** 图片格式：['png', 'jpg', 'jpeg', 'webp', 'avif', 'gif', 'svg'] */
    formats: string[]
    /** 开发环境是否开启 */
    devOpen: boolean
    /** 缓存路径：devOpen为true生效 */
    cacheDir: string
    /** sharp配置 */
    sharpOptions?: Record<string, any>
    /** svgo配置 */
    svgoOptions?: Record<string, any>
    jpgOptions?: Record<string, any>
    pngOptions?: Record<string, any>
    webpOptions?: Record<string, any>
    avifOptions?: Record<string, any>
    gifOptions?: Record<string, any>
}

const quality = 80

const defaultConfig: PluginOptions = {
    quality,
    formats: IMG_FORMATS,
    cacheDir: '.vite_cache/image',
    svgoOptions: {},
    devOpen: false,
}

export default (userConfig?: Partial<PluginOptions>): Plugin => {
    const config = Object.assign({}, defaultConfig, userConfig || {})
    if (!config.sharpOptions || !config.sharpOptions.quality) {
        config.sharpOptions = Object.assign(
            { quality: config.quality },
            config.sharpOptions || {}
        )
    }
    let viteConfig: ResolvedConfig

    return {
        name: 'vite:image-optimizer',
        configResolved(c: ResolvedConfig) {
            viteConfig = Object.assign(viteConfig || {}, c)
        },
        closeBundle() {
            const assetsPath = path.join(cwd(), viteConfig.build.outDir)
            pressDirImage(assetsPath, config)
        },
    }
}
