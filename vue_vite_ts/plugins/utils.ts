import { parse } from 'path'
import { IMG_FORMATS } from './constants'

/**
 * 将字节数转换为人性化的字符串
 * @param {number} bytes
 * @returns {string}
 */
export function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
/**
 * 是否为图片路径
 * @param path
 */
export function isImage(path: string) {
    const { ext } = parse(path)
    return IMG_FORMATS.includes(ext)
}
