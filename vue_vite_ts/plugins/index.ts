// vite-plugin-image-compress.ts
import type { PluginOption, ResolvedConfig } from 'vite'
import fs, { existsSync, readFileSync, writeFile } from 'fs'
import path, { join, parse } from 'path'
import { DEFAULT_CONFIG, IMG_FORMATS_ENUM } from './constants'
import { pressImage, processImage } from './press'
import { filterImage } from './utils'
import { getCacheKey } from './cache'
export type PluginOptions = {
    quality?: number
    enableDev?: boolean
    enableDevWebp?: boolean
    enableWebP?: boolean
    include?: string[]
    exclude?: string[]
    cacheDir?: string
    regExp?: string
}

export default function ImageTools(options: PluginOptions = {}): PluginOption {
    // 初始化图片过滤正则
    if (options && !options.regExp && options.include) {
        DEFAULT_CONFIG.regExp = `\\.(${options.include.join('|')})$`
    }

    const { quality, enableWebP, enableDevWebp, regExp, cacheDir, enableDev } =
        Object.assign(DEFAULT_CONFIG, options)

    let isBuild = false
    let viteConfig: ResolvedConfig
    const cachePath = path.resolve(process.cwd(), cacheDir)

    // 创建缓存目录
    if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath, { recursive: true })
    }

    // 生成缓存键（基于文件内容和配置）

    // // 处理单张图片
    // const processImage = async (filePath: string, content: Buffer) => {
    //     if (exclude.test(filePath)) return content

    //     const cacheKey = getCacheKey(content, filePath)
    //     const cachedFile = path.join(cachePath, cacheKey)

    //     // 检查缓存
    //     if (fs.existsSync(cachedFile)) {
    //         return fs.promises.readFile(cachedFile)
    //     }

    //     // 使用 sharp 处理
    //     const pipeline = sharp(content)
    //     if (enableWebP) {
    //         pipeline.webp({ quality })
    //     } else {
    //         pipeline.jpeg({ quality })
    //     }

    //     const processedBuffer = await pipeline.toBuffer()

    //     // 写入缓存
    //     await fs.promises.writeFile(cachedFile, processedBuffer)
    //     return processedBuffer
    // }

    // 替换资源引用路径
    const replaceResourcePath = (code: string, originalPath: string) => {
        const ext = path.extname(originalPath)
        return code.replace(
            new RegExp(originalPath.replace(/\./g, '\\.'), 'g'),
            originalPath.replace(
                ext,
                enableWebP ? '.webp' : '_compressed' + ext
            )
        )
    }

    return {
        name: 'vite-plugin-image-compress',
        config(config, { command }) {
            isBuild = command === 'build'
        },
        configResolved(config) {
            viteConfig = config
        },
        // 开发模式：拦截图片请求，处理图片压缩和转webp
        configureServer(server) {
            if (!enableDev) {
                return
            }
            server.middlewares.use(async (req, res, next) => {
                if (!filterImage(req.url)) return next()

                try {
                    const filePath = decodeURIComponent(
                        path.resolve(
                            process.cwd(),
                            req.url.split('?')[0].slice(1)
                        )
                    )

                    // filter image
                    if (!filterImage(filePath)) {
                        next()
                    }

                    const { ext } = parse(filePath)
                    const type = enableDevWebp
                        ? IMG_FORMATS_ENUM.webp
                        : ext.replace('.', '')

                    const buffer = await processImage(filePath)

                    if (!buffer) {
                        next()
                    }

                    res.setHeader('Content-Type', `image/${type}`)
                    res.end(buffer)
                } catch (e) {
                    next()
                }
            })
        },

        // 构建模式：处理import资源
        async transform(code, id) {
            const res = {
                code: code,
                map: null,
            }
            // 开发环境
            if (!isBuild) {
                if (!enableDev || !enableDevWebp) return res
            }

            // 生产环境
            if (isBuild && !enableWebP) {
                return res
            }

            const reg = new RegExp(regExp)
            if (!filterImage(id)) return
            // console.log('🚀 ~ base:', base)
            // const fileContent = await fs.promises.readFile(id)
            // const processed = await processImage(id, fileContent)

            // 替换代码中的引用路径
            // const newCode = replaceResourcePath(code, path.basename(id))
            // console.log('🚀 ~ newCode:', newCode)
            return res
        },

        // 构建模式：替换最终产物中的资源
        async generateBundle(_options, bundle) {
            if (!isBuild) return

            for (const [fileName, chunk] of Object.entries(bundle)) {
                if (fileName.match(/\.(css|html|js)$/)) {
                    let source: string

                    if ((chunk as any).code) {
                        source = (chunk as any).code
                    } else {
                        source = (chunk as any).source.toString()
                    }

                    // 替换所有资源引用
                    const newSource = source.replace(
                        /(\b(src|href|url)\s*$\s*['"]?)([^'"()]+?\.(?:png|jpe?g))(['"]?\s*$)?/gi,
                        (_, prefix, __, path, ext) =>
                            `${prefix}${path.replace(
                                ext,
                                enableWebP ? '.webp' : '_compressed' + ext
                            )}${ext === '.webp' ? '' : ''}`
                    )

                    if ((chunk as any).code) {
                        ;(chunk as any).code = newSource
                    } else {
                        ;(chunk as any).source = newSource
                    }
                }
            }
        },
    }
}
