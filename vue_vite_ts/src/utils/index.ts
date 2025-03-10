export function loadImage(url: string): Promise<HTMLImageElement> {
    const img = new Image()
    img.src = url

    return new Promise((resolve, reject) => {
        img.onload = () => {
            resolve(img)
        }
    })
}

export async function getImagePixels(url: string) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = await loadImage(url)

    // 获取整个图片的像素数据
    const imageData = ctx.getImageData(0, 0, img.width, img.height)
    const pixels = imageData.data // 像素数据是一个一维数组，每 4 个元素表示一个像素（RGBA）
    const res = []
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let index = (y * img.width + x) * 4
            let r = pixels[index] // 红色通道
            let g = pixels[index + 1] // 绿色通道
            let b = pixels[index + 2] // 蓝色通道
            let a = pixels[index + 3] // 透明度通道（0-255）
            res.push(`${r},${g},${b},${a};${x},${y}`)
        }
    }

    return res
}

/** 生成距离场 */
export async function createSDFData(canvas: HTMLCanvasElement, showColor = false) {

    const ctx = canvas.getContext('2d')

    // 提取透明像素并生成距离场
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const sdfData = new Float32Array(canvas.width * canvas.height)

    // 初始化：透明像素距离为 0，非透明为无穷大
    for (let i = 0; i < imageData.data.length; i += 4) {
        const alpha = imageData.data[i + 3]
        const idx = Math.floor(i / 4)
        sdfData[idx] = alpha === 0 ? 0 : Infinity
    }

    // 跳转洪水算法生成距离场（Jump Flooding Algorithm）
    const passes = [1,2,4,8,16] // 逐步扩大搜索范围
    for (const step of passes) {
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const idx = y * canvas.width + x
                if (sdfData[idx] === 0) continue

                let minDist = sdfData[idx]
                for (let dy = -step; dy <= step; dy += step) {
                    for (let dx = -step; dx <= step; dx += step) {
                        const nx = x + dx,
                            ny = y + dy
                        if (
                            nx < 0 ||
                            nx >= canvas.width ||
                            ny < 0 ||
                            ny >= canvas.height
                        )
                            continue
                        const nIdx = ny * canvas.width + nx
                        const dist =
                            Math.sqrt(dx * dx + dy * dy) + sdfData[nIdx]
                        if (dist < minDist) minDist = dist
                        if (showColor) {
                            ctx.fillStyle = `rgb(${minDist}, ${minDist}, ${minDist})`
                            ctx.fillRect(x,y,1,1)
                        }
                    }
                }
                sdfData[idx] = minDist
            }
        }
    }
    return sdfData
}

export function fillImg(
    canvas: HTMLCanvasElement,
    sdfData: Float32Array<ArrayBuffer>,
    images: HTMLImageElement[]
) {
    // 定义图片填充参数
    const padding = 10 // 图片间距
    const ctx = canvas.getContext('2d')

    // 泊松圆盘采样（确保不重叠）
    const points = []
    while (points.length < images.length) {
        // 随机选择一个候选位置
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)
        const idx = y * canvas.width + x

        // 检查距离场是否足够容纳图片
        const radius =
            Math.min(
                images[points.length].width,
                images[points.length].height
            ) /
                2 +
            padding
        if (sdfData[idx] >= radius) {
            // 检查与其他点的距离
            let valid = true
            for (const p of points) {
                const dx = p.x - x,
                    dy = p.y - y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < p.radius + radius) {
                    valid = false
                    break
                }
            }
            if (valid) {
                points.push({ x, y, radius })
            }
        }
    }

    // // 绘制填充图片
    points.forEach(({ x, y }, i) => {
        ctx.drawImage(
            images[i],
            x - images[i].width / 2,
            y - images[i].height / 2
        )
    })
}
