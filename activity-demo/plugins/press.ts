import path, { join, parse } from 'path'
import { IMG_FORMATS, IMG_FORMATS_ENUM } from './constants'
import { formatBytes } from './utils'
import sharp from 'sharp'
import { readdirSync, readFileSync, statSync, writeFile } from 'fs'
import { PluginOptions } from './imageOptimizer'

export async function pressImage({
    filePath,
    outputPath,
    pluginOptions,
}: {
    filePath: string
    outputPath: string
    pluginOptions: PluginOptions
}) {
    const { ext, base } = parse(filePath)
    const output = outputPath || filePath
    if (!IMG_FORMATS.includes(ext)) {
        return
    }

    const buffer = readFileSync(filePath)
    let image = sharp(buffer)
    if (
        ext.includes(IMG_FORMATS_ENUM.jpeg) ||
        ext.includes(IMG_FORMATS_ENUM.jpg)
    ) {
        const config = pluginOptions.jpgOptions || pluginOptions.sharpOptions
        image = image.jpeg(config)
    } else {
        const format = ext.split('.')[ext.split('.').length - 1]
        image = image[format](
            pluginOptions[`${format.toLocaleLowerCase()}Options`] || pluginOptions.sharpOptions
        )
    }

    const compressedBuffer = await image.toBuffer()
    console.log(
        `${base}：${formatBytes(buffer.length)} ============> ${formatBytes(
            compressedBuffer.length
        )}`
    )
    return new Promise((resolve, reject) => {
        writeFile(output, compressedBuffer, (err) => {
            if (err) {
                reject(err)
                return
            }
            resolve(output)
        })
    })
}

export async function getDirFilePath(dir: string) {
    const pathList: string[] = []
    const files = readdirSync(dir)

    for (let index = 0; index < files.length; index++) {
        const path = join(dir, files[index])
        const isFile = await statSync(path).isFile()
        if (isFile) {
            pathList.push(path)
        } else {
            const list = await getDirFilePath(path)
            pathList.push(...list)
        }
    }

    return pathList
}

export async function pressDirImage(dir: string, pluginOptions: PluginOptions) {
    const pathList: string[] = await getDirFilePath(dir)

    return await Promise.all(
        pathList
            .filter((path) => IMG_FORMATS.includes(parse(path).ext))
            .map((path) => {
                return pressImage({
                    filePath: path,
                    outputPath: path,
                    pluginOptions,
                })
            })
    )
}
