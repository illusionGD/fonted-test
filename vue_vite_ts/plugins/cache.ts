import crypto from 'crypto'
import { extname, join, parse } from 'path'
export const cacheMap = new Map<string, string>() // 记录已缓存的文件路径

/**
 * 获取缓存路径
 * @param filePath
 * @param cacheDir
 */
export function getCachePath(filePath: string, cacheDir: string) {
    const { name } = parse(filePath)
    const hash = crypto.createHash('md5').update(filePath).digest('hex')
    return join(cacheDir, `${name}_${hash}${extname(filePath)}`)
}
